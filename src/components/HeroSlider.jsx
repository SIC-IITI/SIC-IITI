import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./HeroSlider.css";

export default function HeroSlider({
  slides = [],
  height = "70vh",
  autoplayDelay = 4000,
  showNavigation = true,
  showPagination = true,
}) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
      pagination={showPagination ? { clickable: true } : false}
      navigation={showNavigation}
      loop
      className="hero-swiper"
      style={{ height }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {slide.title && (
              <div className="hero-overlay">
                <h1>{slide.title}</h1>
                {slide.subtitle && <p>{slide.subtitle}</p>}
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
