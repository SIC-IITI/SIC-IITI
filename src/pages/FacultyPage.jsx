import React from "react";
import HeroSection from "@/components/FacultyPage/HeroSection";
import SectionTitle from "@/components/FacultyPage/SectionTitle";
import TeamCard from "@/components/FacultyPage/TeamCard";
import { facultyAdvisors, coreTeam, alumni, co_convenor } from "@/data/FacultyData";
import HeroSlider from "@/components/HeroSlider";
import { useEffect } from "react";
import "./FacultyPage.css";

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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">SIC Team</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            A National Facility of IIT Indore
          </p>
        </div>
      </section>

      <main className="team-page-main">


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
        {/* Co-convenor Team */}
        <div className="team-section">
          <h3 className="team-heading">Co-Conveners</h3>
          {/* <p className="team-subtext">The backbone of our organization</p> */}

          <div className="team-grid f-core-team">
            {co_convenor.map((member, index) => (
              <div key={index} className="animate-on-scroll">
                <TeamCard key={index} {...member} />
              </div>
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div className="team-section">
          <h3 className="team-heading">Technical Team</h3>
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
