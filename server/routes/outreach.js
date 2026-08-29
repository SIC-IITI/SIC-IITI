import express from "express";
import { pool } from "../db.js";
import { requireAdmin } from "../adminAuth.js";
import { uploadOutreachImage, toPublicPath, deleteUploadedFile } from "../uploads.js";

const router = express.Router();

function toApiShape(row) {
  return {
    id: row.id,
    date: row.date_label,
    title: row.title,
    image: row.image || "",
    description: row.description || "",
    updatedAt: row.updated_at,
  };
}

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM outreach ORDER BY sort_order, id DESC");
  res.json(rows.map(toApiShape));
});

router.get("/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM outreach WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Outreach entry not found" });
  res.json(toApiShape(rows[0]));
});

router.post("/", requireAdmin, uploadOutreachImage.single("imageFile"), async (req, res) => {
  const b = req.body;
  if (!b.title || !b.date) {
    return res.status(400).json({ error: "title and date are required" });
  }

  const image = req.file ? toPublicPath("outreach", req.file.filename) : b.image || "";

  const [result] = await pool.query(
    `INSERT INTO outreach (date_label, title, image, description)
     VALUES (?,?,?,?)`,
    [b.date, b.title, image, b.description || ""]
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
    `UPDATE outreach SET date_label=?, title=?, image=?, description=? WHERE id=?`,
    [
      b.date ?? current.date_label,
      b.title ?? current.title,
      image,
      b.description ?? current.description,
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
