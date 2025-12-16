import React from "react";
import HeroSection from "@/components/FacultyPage/HeroSection";
import SectionTitle from "@/components/FacultyPage/SectionTitle";
import TeamCard from "@/components/FacultyPage/TeamCard";
import { facultyAdvisors, coreTeam, alumni } from "@/data/FacultyData";
import HeroSlider from "@/components/HeroSlider";
import { useEffect } from "react";
import "./FacultyPage.css";

const teamSlides = [
  {
    image: "assets/TeamPhotos/Team_4.jpg",
    title: "SIC Team",
    subtitle: "A National Facility of IIT Indore",
  },
  {
    image: "assets/TeamPhotos/Team_5.jpg",
    title: "Research & Innovation",
    subtitle: "Empowering future technologies",
  },
  {
    image: "assets/TeamPhotos/Team_6.jpg",
    title: "Collaborative Excellence",
    subtitle: "Where science meets impact",
  },
];


export default function FacultyPage() {
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
      {/* <HeroSection image="Team_Hero_1.jpg" alt="SIC Community Team" /> */}
      <HeroSlider
              slides={teamSlides}
              height="75vh"
              autoplayDelay={4500}
            />

      <main className="team-page-main">
        <SectionTitle
          title="Our Team"
          subtitle="Meet the dedicated individuals who make SIC Community a thriving community of mechanical engineering enthusiasts at IIT Indore."
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

          <div className="team-grid f-core-team">
            {coreTeam.map((member, index) => (
              <div key={index} className="animate-on-scroll">
              <TeamCard key={index} {...member} />
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Section */}
        <div className="team-section">
          <h3 className="team-heading">Honorable erstwhile members</h3>
          <p className="team-subtext">Alumni who shaped our community</p>

          <div className="team-grid f-alumni-team">
            {alumni.map((member, index) => (
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
