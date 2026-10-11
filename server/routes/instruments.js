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

function getLang(req) {
  return req.query.lang === "hi" ? "hi" : "en";
}

function pick(row, field, lang) {
  if (lang === "hi" && row[`${field}_hi`] != null && row[`${field}_hi`] !== "") {
    return row[`${field}_hi`];
  }
  return row[field];
}

async function resolveSortOrder(value) {
  if (value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value))) {
    return Math.trunc(Number(value));
  }
  const [[row]] = await pool.query("SELECT COALESCE(MAX(sort_order), 0) + 10 AS next FROM instruments");
  return row.next;
}

function toApiShape(row, lang = "en") {
  return {
    id: row.id,
    name: row.name,
    fullName: pick(row, "full_name", lang),
    category: row.category,
    model: row.model,
    showInStatus: !!row.show_in_status,
    status: row.status,
    displayOrder: row.sort_order,
    usageCharges: {
      academic: row.usage_academic || "",
      industrial: row.usage_industrial || "",
      unit: row.usage_unit || "",
    },
    features: lang === "hi" && row.features_hi ? row.features_hi : (row.features || []),
    applications: lang === "hi" && row.applications_hi ? row.applications_hi : (row.applications || []),
    handledBy: row.handled_by || "",
    email: row.email || "",
    location: pick(row, "location", lang),
    images: row.images || [],
    updatedAt: row.updated_at,
  };
}

router.get("/", async (req, res) => {
  const lang = getLang(req);
  const [rows] = await pool.query(
    "SELECT * FROM instruments ORDER BY sort_order, category, name"
  );
  res.json(rows.map((r) => toApiShape(r, lang)));
});

router.get("/categories", async (req, res) => {
  const lang = getLang(req);
  const [instrumentRows] = await pool.query(
    "SELECT category FROM instruments GROUP BY category ORDER BY MIN(sort_order), category"
  );
  const [descRows] = await pool.query("SELECT * FROM category_descriptions");
  const descMap = Object.fromEntries(descRows.map((d) => [d.category, d]));
  res.json(
    instrumentRows.map((r) => ({
      category: r.category,
      description: pick(descMap[r.category] || {}, "description", lang),
    }))
  );
});

router.get("/:id", async (req, res) => {
  const lang = getLang(req);
  const [rows] = await pool.query("SELECT * FROM instruments WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Instrument not found" });
  res.json(toApiShape(rows[0], lang));
});

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

  const sortOrder = await resolveSortOrder(b.displayOrder);

  await pool.query(
    `INSERT INTO instruments
      (id, name, full_name, full_name_hi, category, model, show_in_status, status,
       usage_academic, usage_industrial, usage_unit, features, features_hi,
       applications, applications_hi, handled_by, email, location, location_hi, images, sort_order)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id,
      b.name,
      b.fullName || b.name,
      b.fullNameHi || null,
      b.category,
      b.model,
      b.showInStatus !== false,
      b.status || "Operational",
      b.usageCharges?.academic || "",
      b.usageCharges?.industrial || "",
      b.usageCharges?.unit || "",
      JSON.stringify(b.features || []),
      b.featuresHi ? JSON.stringify(b.featuresHi) : null,
      JSON.stringify(b.applications || []),
      b.applicationsHi ? JSON.stringify(b.applicationsHi) : null,
      b.handledBy || "",
      b.email || "",
      b.location || "",
      b.locationHi || null,
      JSON.stringify(b.images || []),
      sortOrder,
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

  const sortOrder =
    b.displayOrder === undefined ? current.sort_order : await resolveSortOrder(b.displayOrder);

  await pool.query(
    `UPDATE instruments SET
      name=?, full_name=?, full_name_hi=?, category=?, model=?, show_in_status=?, status=?,
      usage_academic=?, usage_industrial=?, usage_unit=?, features=?, features_hi=?,
      applications=?, applications_hi=?, handled_by=?, email=?, location=?, location_hi=?, images=?, sort_order=?
     WHERE id=?`,
    [
      b.name ?? current.name,
      b.fullName ?? current.full_name,
      b.fullNameHi !== undefined ? b.fullNameHi : current.full_name_hi,
      b.category ?? current.category,
      b.model ?? current.model,
      b.showInStatus === undefined ? current.show_in_status : !!b.showInStatus,
      b.status ?? current.status,
      b.usageCharges?.academic ?? current.usage_academic,
      b.usageCharges?.industrial ?? current.usage_industrial,
      b.usageCharges?.unit ?? current.usage_unit,
      JSON.stringify(b.features ?? current.features),
      b.featuresHi !== undefined ? JSON.stringify(b.featuresHi) : current.features_hi,
      JSON.stringify(b.applications ?? current.applications),
      b.applicationsHi !== undefined ? JSON.stringify(b.applicationsHi) : current.applications_hi,
      b.handledBy ?? current.handled_by,
      b.email ?? current.email,
      b.location ?? current.location,
      b.locationHi !== undefined ? b.locationHi : current.location_hi,
      JSON.stringify(b.images ?? current.images),
      sortOrder,
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

router.put("/categories/:category", requireAdmin, async (req, res) => {
  await pool.query(
    `INSERT INTO category_descriptions (category, description, description_hi) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE description = VALUES(description), description_hi = VALUES(description_hi)`,
    [req.params.category, req.body.description || "", req.body.descriptionHi || null]
  );
  res.json({ success: true });
});

export default router;
