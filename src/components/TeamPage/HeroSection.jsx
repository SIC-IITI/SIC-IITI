import React from "react";
import "./HeroSection.css";

export default function HeroSection({ image, alt }) {
  return (
    <div className="hero-section">
      <img src={image} alt={alt} className="hero-image" />
    </div>
  );
}
