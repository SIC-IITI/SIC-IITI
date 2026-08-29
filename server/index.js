import express from "express";
import cors from "cors";
import "dotenv/config";

import { ensureSchema } from "./db.js";
import { UPLOADS_DIR } from "./uploads.js";
import instrumentsRouter from "./routes/instruments.js";
import eventsRouter from "./routes/events.js";
import outreachRouter from "./routes/outreach.js";
import adminRouter from "./routes/admin.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/instruments", instrumentsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/outreach", outreachRouter);
app.use("/api/admin", adminRouter);

// Multer / general error handler so bad uploads return JSON, not a stack trace
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

ensureSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SIC admin API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database schema:", err);
    process.exit(1);
  });
