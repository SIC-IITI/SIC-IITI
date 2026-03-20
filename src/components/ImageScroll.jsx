import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ImageScroll() {
  const scrollRef = useRef(null);
  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop', alt: 'Research Facility' },
    { id: 2, src: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=600&h=400&fit=crop', alt: 'Microscope' },
    { id: 3, src: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&h=400&fit=crop', alt: 'Lab Analysis' },
    { id: 4, src: 'https://images.unsplash.com/photo-1576092160365-112136cc4e75?w=600&h=400&fit=crop', alt: 'Research Work' },
    { id: 5, src: 'https://images.unsplash.com/photo-1628515303918-e8e2be6b34e6?w=600&h=400&fit=crop', alt: 'Scientific Equipment' },
    { id: 6, src: 'https://images.unsplash.com/photo-1581092161562-40038e57e21a?w=600&h=400&fit=crop', alt: 'Lab Equipment' },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Left Scroll Button */}
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Added ref and removed scrollbar for a cleaner look */}
      <div 
        ref={scrollRef} 
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" 
      >
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

      {/* Right Scroll Button */}
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </div>
  );
}

export default ImageScroll;