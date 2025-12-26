
export const getInstrumentImages = (instrumentId) => {
  return [];
};
export const normalizeImagePath = (imagePath) => {
  if (Array.isArray(imagePath)) {
    return imagePath.map(path => {
      return path.startsWith('/') ? path : `/${path}`;
    });
  }

  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

export const getImagesFromInstrument = (instrument) => {
  if (!instrument) return [];
  let images = [];

  if (instrument.images && Array.isArray(instrument.images)) {
    images = instrument.images;
  } else if (instrument.image) {
    images = Array.isArray(instrument.image) ? instrument.image : [instrument.image];
  }

  return normalizeImagePath(images);
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
  getImagesFromInstrument,
  imageExists,
  getFallbackImages,
};
