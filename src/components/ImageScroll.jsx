import React from 'react';

function ImageScroll() {
  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop', alt: 'Research Facility' },
    { id: 2, src: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=600&h=400&fit=crop', alt: 'Microscope' },
    { id: 3, src: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&h=400&fit=crop', alt: 'Lab Analysis' },
    { id: 4, src: 'https://images.unsplash.com/photo-1576092160365-112136cc4e75?w=600&h=400&fit=crop', alt: 'Research Work' },
    { id: 5, src: 'https://images.unsplash.com/photo-1628515303918-e8e2be6b34e6?w=600&h=400&fit=crop', alt: 'Scientific Equipment' },
    { id: 6, src: 'https://images.unsplash.com/photo-1581092161562-40038e57e21a?w=600&h=400&fit=crop', alt: 'Lab Equipment' },
  ];

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        {images.map((img) => (
          <div key={img.id} className="flex-shrink-0 w-96 h-64 rounded-lg overflow-hidden shadow-lg border border-blue-200">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </div>
  );
}

export default ImageScroll;
