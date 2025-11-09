import React from "react";
import HeroSection from "@/components/FacultyPage/HeroSection";
import SectionTitle from "@/components/FacultyPage/SectionTitle";
import TeamCard from "@/components/FacultyPage/TeamCard";
import { facultyAdvisor, coreTeam} from "@/data/TeamData";
import "./TeamPage.css";

export default function TeamPage() {
  return (
    <div className="team-page">
      <HeroSection image="Hero_Section_1.jpg" alt="SIC Community Team" />

      <main className="team-page-main">
        <SectionTitle
          title="SIC Committee"
          subtitle="SIC - A National Facility of IIT Indore, empowering cutting-edge research and innovation."
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

        
      </main>
    </div>
  );
}
