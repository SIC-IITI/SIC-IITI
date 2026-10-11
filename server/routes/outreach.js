import express from "express";
import { pool } from "../db.js";
import { requireAdmin } from "../adminAuth.js";
import { uploadOutreachImage, toPublicPath, deleteUploadedFile } from "../uploads.js";

const router = express.Router();

function getLang(req) {
  return req.query.lang === "hi" ? "hi" : "en";
}

function pick(row, field, lang) {
  if (lang === "hi" && row[`${field}_hi`] != null && row[`${field}_hi`] !== "") {
    return row[`${field}_hi`];
  }
  return row[field];
}

function toApiShape(row, lang = "en") {
  return {
    id: row.id,
    date: row.date_label,
    title: pick(row, "title", lang),
    image: row.image || "",
    description: pick(row, "description", lang),
    updatedAt: row.updated_at,
  };
}

router.get("/", async (req, res) => {
  const lang = getLang(req);
  const [rows] = await pool.query("SELECT * FROM outreach ORDER BY sort_order, id DESC");
  res.json(rows.map((r) => toApiShape(r, lang)));
});

router.get("/:id", async (req, res) => {
  const lang = getLang(req);
  const [rows] = await pool.query("SELECT * FROM outreach WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Outreach entry not found" });
  res.json(toApiShape(rows[0], lang));
});

router.post("/", requireAdmin, uploadOutreachImage.single("imageFile"), async (req, res) => {
  const b = req.body;
  if (!b.title || !b.date) {
    return res.status(400).json({ error: "title and date are required" });
  }

  const image = req.file ? toPublicPath("outreach", req.file.filename) : b.image || "";

  const [result] = await pool.query(
    `INSERT INTO outreach (date_label, title, title_hi, image, description, description_hi)
     VALUES (?,?,?,?,?,?)`,
    [b.date, b.title, b.titleHi || null, image, b.description || "", b.descriptionHi || null]
  );

  const [rows] = await pool.query("SELECT * FROM outreach WHERE id = ?", [result.insertId]);
  res.status(201).json(toApiShape(rows[0]));
});

router.put("/:id", requireAdmin, uploadOutreachImage.single("imageFile"), async (req, res) => {
  const [existing] = await pool.query("SELECT * FROM outreach WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Outreach entry not found" });
  const current = existing[0];
  const b = req.body;

  let image = b.image ?? current.image;
  if (req.file) {
    if (current.image) deleteUploadedFile(current.image);
    image = toPublicPath("outreach", req.file.filename);
  }

  await pool.query(
    `UPDATE outreach SET date_label=?, title=?, title_hi=?, image=?, description=?, description_hi=? WHERE id=?`,
    [
      b.date ?? current.date_label,
      b.title ?? current.title,
      b.titleHi !== undefined ? b.titleHi : current.title_hi,
      image,
      b.description ?? current.description,
      b.descriptionHi !== undefined ? b.descriptionHi : current.description_hi,
      req.params.id,
    ]
  );

  const [rows] = await pool.query("SELECT * FROM outreach WHERE id = ?", [req.params.id]);
  res.json(toApiShape(rows[0]));
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM outreach WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Outreach entry not found" });
  if (rows[0].image) deleteUploadedFile(rows[0].image);
  await pool.query("DELETE FROM outreach WHERE id = ?", [req.params.id]);
  res.json({ success: true });
});

export default router;
