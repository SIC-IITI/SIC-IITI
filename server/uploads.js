import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_DIR = path.join(__dirname, "uploads");

for (const sub of ["instruments", "events", "outreach"]) {
  const dir = path.join(UPLOADS_DIR, sub);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function storageFor(subfolder) {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(UPLOADS_DIR, subfolder)),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${nanoid(8)}${ext}`);
    },
  });
}

const imageFileFilter = (req, file, cb) => {
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error("Only image files are allowed (jpg, png, webp, gif, avif)"));
};

export const uploadInstrumentImages = multer({
  storage: storageFor("instruments"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 8 * 1024 * 1024, files: 12 },
});

export const uploadEventImage = multer({
  storage: storageFor("events"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
});

export const uploadOutreachImage = multer({
  storage: storageFor("outreach"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
});

// Turns a saved file into a public URL the frontend can use directly,
// e.g. "/uploads/instruments/1699999999-ab12cd34.jpg"
export function toPublicPath(subfolder, filename) {
  return `/uploads/${subfolder}/${filename}`;
}

// Deletes an uploaded file given its public path (e.g. "/uploads/instruments/x.jpg").
// Silently no-ops for anything that isn't one of our own uploaded files
// (e.g. paths like "/assets/instruments/..." that ship with the frontend).
export function deleteUploadedFile(publicPath) {
  if (!publicPath || !publicPath.startsWith("/uploads/")) return;
  const filePath = path.join(UPLOADS_DIR, publicPath.replace("/uploads/", ""));
  fs.unlink(filePath, () => {});
}
