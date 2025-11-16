// src/utils/imageLoader.js

/**
 * Get images for a specific instrument from instrumentsData
 * Since images are in public folder, they can be referenced directly
 * @param {string} instrumentId - The instrument ID
 * @returns {string[]} - Array of image URLs from public folder
 */
export const getInstrumentImages = (instrumentId) => {
  // This function is now simplified since we're using direct paths from instrumentsData
  // The images array in instrumentsData already contains the correct paths
  return [];
};

/**
 * Normalize image path to work with public folder
 * Ensures the path starts with / for public folder access
 * @param {string|string[]} imagePath - Single path or array of paths
 * @returns {string|string[]} - Normalized path(s)
 */
export const normalizeImagePath = (imagePath) => {
  if (Array.isArray(imagePath)) {
    return imagePath.map(path => {
      // If path doesn't start with /, add it
      return path.startsWith('/') ? path : `/${path}`;
    });
  }

  // Single path
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

/**
 * Get images from instrumentsData for a specific instrument
 * @param {Object} instrument - The instrument object from instrumentsData
 * @returns {string[]} - Array of image URLs
 */
export const getImagesFromInstrument = (instrument) => {
  if (!instrument) return [];

  // Handle both 'images' array and 'image' string/array
  let images = [];

  if (instrument.images && Array.isArray(instrument.images)) {
    images = instrument.images;
  } else if (instrument.image) {
    images = Array.isArray(instrument.image) ? instrument.image : [instrument.image];
  }

  // Normalize all paths
  return normalizeImagePath(images);
};

/**
 * Check if image exists (basic check, returns true by default)
 * @param {string} imagePath - The image path
 * @returns {boolean} - True if path is valid
 */
export const imageExists = (imagePath) => {
  return imagePath && typeof imagePath === 'string' && imagePath.length > 0;
};

/**
 * Get fallback images for when no images are available
 * @returns {string[]} - Array of fallback image URLs
 */
export const getFallbackImages = () => {
  return [
    'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80',
  ];
};

// Export default object
export default {
  getInstrumentImages,
  normalizeImagePath,
  getImagesFromInstrument,
  imageExists,
  getFallbackImages,
};