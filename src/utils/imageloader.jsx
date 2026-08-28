import { API_BASE } from "../lib/config";

export const getInstrumentImages = (instrumentId) => {
  return [];
};
const isUploadedPath = (path) =>
  typeof path === "string" && (path.startsWith("/uploads/") || path.startsWith("uploads/"));

export const normalizeImagePath = (imagePath) => {
  const normalizeOne = (path) => {
    if (typeof path !== "string") return path;
    const absolute = path.startsWith("/") ? path : `/${path}`;
    return isUploadedPath(absolute) ? `${API_BASE}${absolute}` : absolute;
  };

  if (Array.isArray(imagePath)) {
    return imagePath.map(normalizeOne);
  }

  return normalizeOne(imagePath);
};

export const toOptimizedPath = (imagePath, variant = "full") => {
  if (!imagePath || typeof imagePath !== "string") return imagePath;
 
  if (imagePath.includes("/uploads/")) return imagePath;
  const suffix = variant === "thumb" ? "-thumb.webp" : ".webp";
  return imagePath.replace(/\.(jpe?g|png)$/i, suffix);
};

export const getImagesFromInstrument = (instrument, variant = "full") => {
  if (!instrument) return [];
  let images = [];

  if (instrument.images && Array.isArray(instrument.images)) {
    images = instrument.images;
  } else if (instrument.image) {
    images = Array.isArray(instrument.image) ? instrument.image : [instrument.image];
  }

  return normalizeImagePath(images).map((p) => toOptimizedPath(p, variant));
};

export const imageExists = (imagePath) => {
  return imagePath && typeof imagePath === 'string' && imagePath.length > 0;
};

export const getFallbackImages = () => {
  return [
    'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80',
  ];
};

export default {
  getInstrumentImages,
  normalizeImagePath,
  toOptimizedPath,
  getImagesFromInstrument,
  imageExists,
  getFallbackImages,
};
