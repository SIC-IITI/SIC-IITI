export const getInstrumentImages = (instrumentId) => {
  return [];
};

export const normalizeImagePath = (imagePath) => {
  if (Array.isArray(imagePath)) {
    return imagePath.map((path) => {
      return path.startsWith('/') ? path : `/${path}`;
    });
  }

  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

// Converts an original path like "/assets/instruments/X-Ray/SCXRD/SC-XRD.jpg"
// into its optimized WebP counterpart produced by scripts/optimize-images.js.
// variant: "full" -> "<name>.webp", "thumb" -> "<name>-thumb.webp"
export const toOptimizedPath = (imagePath, variant = "full") => {
  if (!imagePath || typeof imagePath !== "string") return imagePath;
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