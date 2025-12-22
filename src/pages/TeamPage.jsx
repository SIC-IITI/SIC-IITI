import React from "react";
import HeroSection from "@/components/FacultyPage/HeroSection";
import SectionTitle from "@/components/FacultyPage/SectionTitle";
import TeamCard from "@/components/FacultyPage/TeamCard";
import { facultyAdvisors, coreTeam} from "@/data/TeamData";
import HeroSlider from "@/components/HeroSlider";
import { useEffect } from "react";
import "./TeamPage.css";


const teamSlides = [
  {
    image: "assets/TeamPhotos/Team_1.jpg",
    title: "SIC Committee",
    subtitle: "A National Facility of IIT Indore",
  },
  {
    image: "assets/TeamPhotos/Team_2.jpeg",
    title: "Research & Innovation",
    subtitle: "Empowering future technologies",
  },
  {
    image: "assets/TeamPhotos/Team_3.jpg",
    title: "Collaborative Excellence",
    subtitle: "Where science meets impact",
  },
];

export default function TeamPage() {
  useEffect(() => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

  return (
    <div className="team-page">
      {/* <HeroSection image="Hero_Section_1.jpg" alt="SIC Community Team" /> */}
      <HeroSlider
        slides={teamSlides}
        height="75vh"
        autoplayDelay={4500}
      />

      <main className="team-page-main">
        <SectionTitle
          title="SIC Committee"
          subtitle="SIC - A National Facility of IIT Indore, empowering cutting-edge research and innovation."
        />

        {/* Faculty Advisor */}
        <div className="team-section">
          {/* <div className="faculty-advisor">
            <TeamCard {...facultyAdvisor} />
          </div> */}
          <div className="team-grid faculty-advisors">
            {facultyAdvisors.map((advisor, index) => (
              <div key={index} className="animate-on-scroll">
              <TeamCard key={index} {...advisor} />
               </div>
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div className="team-section">
          <h3 className="team-heading">Core Team</h3>
          <p className="team-subtext">The backbone of our organization</p>

          <div className="team-grid core-team">
            {coreTeam.map((member, index) => (
              <div key={index} className="animate-on-scroll">
              <TeamCard key={index} {...member} />
               </div>
            ))}
          </div>
        </div>

        
      </main>
    </div>
  );
}
