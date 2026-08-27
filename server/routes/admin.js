import express from "express";
import { requireAdmin } from "../adminAuth.js";

const router = express.Router();

router.post("/verify", requireAdmin, (req, res) => {
  res.json({ success: true });
});

export default router;
