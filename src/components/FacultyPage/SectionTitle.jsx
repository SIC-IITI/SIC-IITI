import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title">
      <h2 className="section-title-heading">{title}</h2>
      {subtitle && <p className="section-title-subtitle">{subtitle}</p>}
    </div>
  );
}
