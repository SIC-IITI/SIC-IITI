import express from "express";
import { pool } from "../db.js";
import { requireAdmin } from "../adminAuth.js";
import { uploadInstrumentImages, toPublicPath, deleteUploadedFile } from "../uploads.js";

const router = express.Router();

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// DB row -> shape the frontend already expects (matches the old
// static instrumentsData.js entries field-for-field).
function toApiShape(row) {
  return {
    id: row.id,
    name: row.name,
    fullName: row.full_name,
    category: row.category,
    model: row.model,
    showInStatus: !!row.show_in_status,
    status: row.status,
    usageCharges: {
      academic: row.usage_academic || "",
      industrial: row.usage_industrial || "",
      unit: row.usage_unit || "",
    },
    features: row.features || [],
    applications: row.applications || [],
    handledBy: row.handled_by || "",
    email: row.email || "",
    location: row.location || "",
    images: row.images || [],
    updatedAt: row.updated_at,
  };
}

// ---------- Public ----------

router.get("/", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM instruments ORDER BY category, sort_order, name"
  );
  res.json(rows.map(toApiShape));
});

router.get("/categories", async (req, res) => {
  const [instrumentRows] = await pool.query(
    "SELECT DISTINCT category FROM instruments ORDER BY category"
  );
  const [descRows] = await pool.query("SELECT * FROM category_descriptions");
  const descMap = Object.fromEntries(descRows.map((d) => [d.category, d.description]));
  res.json(
    instrumentRows.map((r) => ({
      category: r.category,
      description: descMap[r.category] || "",
    }))
  );
});

router.get("/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM instruments WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Instrument not found" });
  res.json(toApiShape(rows[0]));
});

// ---------- Admin: create / update / delete ----------

router.post("/", requireAdmin, async (req, res) => {
  const b = req.body;
  if (!b.name || !b.category || !b.model) {
    return res.status(400).json({ error: "name, category and model are required" });
  }

  let id = b.id ? slugify(b.id) : slugify(b.name);
  const [existing] = await pool.query("SELECT id FROM instruments WHERE id = ?", [id]);
  if (existing.length > 0) {
    id = `${id}-${Date.now().toString(36)}`;
  }

  await pool.query(
    `INSERT INTO instruments
      (id, name, full_name, category, model, show_in_status, status,
       usage_academic, usage_industrial, usage_unit, features, applications,
       handled_by, email, location, images)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id,
      b.name,
      b.fullName || b.name,
      b.category,
      b.model,
      b.showInStatus !== false,
      b.status || "Operational",
      b.usageCharges?.academic || "",
      b.usageCharges?.industrial || "",
      b.usageCharges?.unit || "",
      JSON.stringify(b.features || []),
      JSON.stringify(b.applications || []),
      b.handledBy || "",
      b.email || "",
      b.location || "",
      JSON.stringify(b.images || []),
    ]
  );

  const [rows] = await pool.query("SELECT * FROM instruments WHERE id = ?", [id]);
  res.status(201).json(toApiShape(rows[0]));
});

router.put("/:id", requireAdmin, async (req, res) => {
  const [existing] = await pool.query("SELECT * FROM instruments WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Instrument not found" });

  const current = existing[0];
  const b = req.body;

  await pool.query(
    `UPDATE instruments SET
      name=?, full_name=?, category=?, model=?, show_in_status=?, status=?,
      usage_academic=?, usage_industrial=?, usage_unit=?, features=?, applications=?,
      handled_by=?, email=?, location=?, images=?
     WHERE id=?`,
    [
      b.name ?? current.name,
      b.fullName ?? current.full_name,
      b.category ?? current.category,
      b.model ?? current.model,
      b.showInStatus === undefined ? current.show_in_status : !!b.showInStatus,
      b.status ?? current.status,
      b.usageCharges?.academic ?? current.usage_academic,
      b.usageCharges?.industrial ?? current.usage_industrial,
      b.usageCharges?.unit ?? current.usage_unit,
      JSON.stringify(b.features ?? current.features),
      JSON.stringify(b.applications ?? current.applications),
      b.handledBy ?? current.handled_by,
      b.email ?? current.email,
      b.location ?? current.location,
      JSON.stringify(b.images ?? current.images),
      req.params.id,
    ]
  );

  const [rows] = await pool.query("SELECT * FROM instruments WHERE id = ?", [req.params.id]);
  res.json(toApiShape(rows[0]));
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM instruments WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Instrument not found" });

  (rows[0].images || []).forEach(deleteUploadedFile);
  await pool.query("DELETE FROM instruments WHERE id = ?", [req.params.id]);
  res.json({ success: true });
});

// ---------- Admin: images ----------

router.post(
  "/:id/images",
  requireAdmin,
  uploadInstrumentImages.array("images", 12),
  async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM instruments WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Instrument not found" });

    const newUrls = (req.files || []).map((f) => toPublicPath("instruments", f.filename));
    const images = [...(rows[0].images || []), ...newUrls];
    await pool.query("UPDATE instruments SET images = ? WHERE id = ?", [
      JSON.stringify(images),
      req.params.id,
    ]);
    res.json({ images });
  }
);

router.delete("/:id/images", requireAdmin, async (req, res) => {
  const { url } = req.body;
  const [rows] = await pool.query("SELECT * FROM instruments WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Instrument not found" });

  const images = (rows[0].images || []).filter((img) => img !== url);
  await pool.query("UPDATE instruments SET images = ? WHERE id = ?", [
    JSON.stringify(images),
    req.params.id,
  ]);
  deleteUploadedFile(url);
  res.json({ images });
});

// ---------- Admin: category description ----------

router.put("/categories/:category", requireAdmin, async (req, res) => {
  await pool.query(
    `INSERT INTO category_descriptions (category, description) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE description = VALUES(description)`,
    [req.params.category, req.body.description || ""]
  );
  res.json({ success: true });
});

export default router;
