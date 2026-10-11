import React from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "@/components/FacultyPage/HeroSection";
import SectionTitle from "@/components/FacultyPage/SectionTitle";
import TeamCard from "@/components/FacultyPage/TeamCard";
import { facultyAdvisors, coreTeam, co_convenor } from "@/data/TeamData";
import HeroSlider from "@/components/HeroSlider";
import { useEffect } from "react";
import "./TeamPage.css";


export default function TeamPage() {
  const { t } = useTranslation();

  const teamSlides = [
    {
      image: "assets/TeamPhotos/armyvisit.png",
      title: t('team.slide1Title'),
      subtitle: t('team.slide1Subtitle'),
    },
    {
      image: "assets/TeamPhotos/Team_2.jpeg",
      title: t('team.slide2Title'),
      subtitle: t('team.slide2Subtitle'),
    },
    {
      image: "assets/TeamPhotos/Team_3.jpg",
      title: t('team.slide3Title'),
      subtitle: t('team.slide3Subtitle'),
    },
  ];

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
          title={t('team.committeeTitle')}
          subtitle={t('team.committeeSubtitle')}
        />

        {/* Faculty Advisor */}
        <div className="team-section">
          {/* <div className="faculty-advisor">
            <TeamCard {...facultyAdvisor} />
          </div> */}
          <div className="team-grid ">
            {facultyAdvisors.map((advisor, index) => (
              <div key={index} className="animate-on-scroll">
                <TeamCard key={index} {...advisor} />
              </div>
            ))}
          </div>
        </div>

        {/* Co-convenor Team */}
        <div className="team-section">
          <h3 className="team-heading">{t('team.coConveners')}</h3>
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
          <h3 className="team-heading">{t('team.coreCommittee')}</h3>
          <p className="team-subtext">{t('team.coreSubtitle')}</p>

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
