import express from "express";
import { pool } from "../db.js";
import { requireAdmin } from "../adminAuth.js";
import { uploadEventImage, toPublicPath, deleteUploadedFile } from "../uploads.js";

const router = express.Router();

function toApiShape(row) {
  return {
    id: row.id,
    date: row.date_label,
    title: row.title,
    image: row.image || "",
    fullDescription: row.full_description || "",
    venue: row.venue || "",
    updatedAt: row.updated_at,
  };
}

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM events ORDER BY sort_order, id DESC");
  res.json(rows.map(toApiShape));
});

router.get("/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Event not found" });
  res.json(toApiShape(rows[0]));
});

router.post("/", requireAdmin, uploadEventImage.single("imageFile"), async (req, res) => {
  const b = req.body;
  if (!b.title || !b.date) {
    return res.status(400).json({ error: "title and date are required" });
  }

  const image = req.file ? toPublicPath("events", req.file.filename) : b.image || "";

  const [result] = await pool.query(
    `INSERT INTO events (date_label, title, image, full_description, venue)
     VALUES (?,?,?,?,?)`,
    [b.date, b.title, image, b.fullDescription || "", b.venue || ""]
  );

  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [result.insertId]);
  res.status(201).json(toApiShape(rows[0]));
});

router.put("/:id", requireAdmin, uploadEventImage.single("imageFile"), async (req, res) => {
  const [existing] = await pool.query("SELECT * FROM events WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Event not found" });
  const current = existing[0];
  const b = req.body;

  let image = b.image ?? current.image;
  if (req.file) {
    if (current.image) deleteUploadedFile(current.image);
    image = toPublicPath("events", req.file.filename);
  }

  await pool.query(
    `UPDATE events SET date_label=?, title=?, image=?, full_description=?, venue=? WHERE id=?`,
    [
      b.date ?? current.date_label,
      b.title ?? current.title,
      image,
      b.fullDescription ?? current.full_description,
      b.venue ?? current.venue,
      req.params.id,
    ]
  );

  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [req.params.id]);
  res.json(toApiShape(rows[0]));
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Event not found" });
  if (rows[0].image) deleteUploadedFile(rows[0].image);
  await pool.query("DELETE FROM events WHERE id = ?", [req.params.id]);
  res.json({ success: true });
});

export default router;
