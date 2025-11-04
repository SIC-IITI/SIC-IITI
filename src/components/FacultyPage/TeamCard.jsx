import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import "./TeamCard.css";

export default function TeamCard({ image, name, designation, researchAreas, email, phone }) {
  return (
    <div className="team-card">
      <div className="team-card-image-wrapper">
        <img src={image} alt={name} className="team-card-image" />
      </div>

      <div className="team-card-content">
        <h3 className="team-card-name">{name}</h3>
        <p className="team-card-designation">{designation}</p>

        {researchAreas && (
          <p className="team-card-research">
             <strong>Research Areas:</strong> {researchAreas}
          </p>
        )}

        <div className="team-card-contact">
          {email && (
            <p className="team-card-email">
              <FaEnvelope className="icon" /> 
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          )}
          {phone && (
            <p className="team-card-phone">
              <FaPhone className="icon" /> 
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
