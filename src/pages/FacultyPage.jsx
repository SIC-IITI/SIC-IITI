import React from "react";
import HeroSection from "@/components/FacultyPage/HeroSection";
import SectionTitle from "@/components/FacultyPage/SectionTitle";
import TeamCard from "@/components/FacultyPage/TeamCard";
import { facultyAdvisor, coreTeam, alumni } from "@/data/FacultyData";
import "./FacultyPage.css";

export default function TeamPage() {
  return (
    <div className="team-page">
      <HeroSection image="Team_Hero_1.jpg" alt="SIC Community Team" />

      <main className="team-page-main">
        <SectionTitle
          title="Our Team"
          subtitle="Meet the dedicated individuals who make SIC Community a thriving community of mechanical engineering enthusiasts at IIT Indore."
        />

        {/* Faculty Advisor */}
        <div className="team-section">
          <div className="faculty-advisor">
            <TeamCard {...facultyAdvisor} />
          </div>
        </div>

        {/* Core Team */}
        <div className="team-section">
          <h3 className="team-heading">Core Team</h3>
          <p className="team-subtext">The backbone of our organization</p>

          <div className="team-grid core-team">
            {coreTeam.map((member, index) => (
              <TeamCard key={index} {...member} />
            ))}
          </div>
        </div>

        {/* Alumni Section */}
        <div className="team-section">
          <h3 className="team-heading">Honorable erstwhile members</h3>
          <p className="team-subtext">Alumni who shaped our community</p>

          <div className="team-grid alumni-team">
            {alumni.map((member, index) => (
              <TeamCard key={index} {...member} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
