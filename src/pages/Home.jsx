"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, GraduationCap, Briefcase, Trophy } from "lucide-react"
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import Calendar from 'react-calendar';
import '../components/CustomCalendar.css';

export default function Home() {
  const [eventsIndex, setEventsIndex] = useState(0)
  const [excellenceIndex, setExcellenceIndex] = useState(0)
  const [date, setDate] = useState(new Date())
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px', 
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);  
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []); 

  const heroImages = [
    "/sic.png",
    "/sic-ppl.png",
    "/sic-ppl2.png",
    "/close-sic.png"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const eventsItems = [
    {
      date: "16-18 Nov 2025",
      title: "SAP 2025: IIT Indore to host the prestigious Symposium on Advanced Photonics, bringing together experts in light-based technologies.",
    },
    {
      date: "8-12 Dec 2025",
      title: "ICDP Workshop: A 5-day workshop on 'Information, Communications and Data Processing' to be held at the institute.",
    },
    {
      date: "11-13 Dec 2025",
      title: "AIMTDR 2025: 10th International Conference on Manufacturing Technology, Design and Research to be hosted by Dept. of Mechanical Engineering.",
    },
    {
      date: "16-20 Dec 2025",
      title: "ICISS 2025: The International Conference on Information Systems Security will be held at IIT Indore, focusing on cybersecurity advancements.",
    },
    {
      date: "15-26 Dec 2025",
      title: "GIAN Course: 'The Exciting Landscape of Precision Medicines and Therapeutics' course to be offered by IIT Indore.",
    },
    {
      date: "21-23 Mar 2025",
      title: "CSE Open-house Symposium 3.0: Featuring expert talks, coding competitions, and research presentations from the CSE department.",
    },
    {
      date: "January 2026",
      title: "Fluxus 2026: Get ready for IIT Indore's annual techno-cultural festival, promising innovation, art, and entertainment.",
    },
  ]

  const excellenceItems = [
    {
      image: "/sic-ppl.png",
      title: "Research Innovation",
      description: "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
    },
    {
      image: "/sic-ppl2.png",
      title: "Research Innovation",
      description: "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
    },
    {
      image: "/sic-ppl.png",
      title: "Research Innovation",
      description: "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
    },
    {
      image: "/sic-ppl2.png",
      title: "Research Innovation",
      description: "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
    },
  ]

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text
    return text.slice(0, limit) + "..."
  }

  const scrollEvents = (direction) => {
    if (direction === "next") {
      setEventsIndex((prev) => (prev + 1) % eventsItems.length)
    } else {
      setEventsIndex((prev) => (prev - 1 + eventsItems.length) % eventsItems.length)
    }
  }

  const scrollExcellence = (direction) => {
    if (direction === "next") {
      setExcellenceIndex((prev) => (prev + 1) % excellenceItems.length)
    } else {
      setExcellenceIndex((prev) => (prev - 1 + excellenceItems.length) % excellenceItems.length)
    }
  }

  const getVisibleItems = (items, currentIndex) => {
    const visible = []
    for (let i = 0; i < 4; i++) {
      visible.push(items[(currentIndex + i) % items.length])
    }
    return visible
  }

  const getSundayClassName = ({ date, view }) => {
    if (view === 'month' && date.getDay() === 0) {
      return 'sunday-tile'
    }
  }

  return (
    <div className="min-h-screen bg-white home-page-wrapper">
      

      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
        {/* Image Container with Fade Transitions */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url("${image}")` }}
            />
          ))}
        </div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply pointer-events-none" aria-hidden="true" />

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 xl:px-28 h-full flex items-center">
          <div className="max-w-3xl animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow">
              Welcome To
              <br />
              Sophisticated
              <br />
              Instrumentation Centre
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl drop-shadow">
              Empowering minds, fostering innovation, and shaping the future through world-class education and
              groundbreaking research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
                Explore
              </button>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
                Book
              </button>
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white w-8' : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-12 md:mb-16 animate-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-20 sm:w-24 bg-gray-300" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">About</h2>
              <div className="h-px w-20 sm:w-24 bg-gray-300" />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-5 animate-on-scroll">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Sophisticated Instrumentation Center</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                The Sophisticated Instrumentation Center (SIC) – A National Facility was established in September 2011 to expedite the research program at IIT Indore. It is now a national facility providing services such as data recording facilities and expertise in different state-of-the-art instruments to academia and industry from all parts of the country and some international centers.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                Furthermore, it is catering to the needs of many educational institutes and industries in and around central India and satisfying the need of scientific world, academia and industries with equal importance and emphasis. It is also engaged in spreading awareness among researchers, academia and industries for the probable use of the facility among diverse users to make the facility a part of our mutual co-existence to enhance quality of researches and products in industries.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end animate-on-scroll stagger-2">
              <img
                src="/close-sic.png"
                alt="Laboratory"
                className="rounded-lg shadow-lg w-full max-w-md object-cover h-80 md:h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events & Workshops Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-10 md:mb-12 animate-on-scroll">
            Events & Workshops
          </h2>
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleItems(eventsItems, eventsIndex).map((item, index) => (
                <div 
                  key={index} 
                  
                  className={`border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6 animate-on-scroll stagger-${index + 1}`}
                >
                  <div className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    {item.date}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">{truncateText(item.title, 100)}</p>
                  <Link
                    to="/events"
                    className="text-xs sm:text-sm text-blue-600 hover:underline font-medium"
                    aria-label={`Read more about ${item.title}`}
                  >
                    Read more
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 gap-4 animate-on-scroll">
              <div className="flex gap-2">
                <button
                  onClick={() => scrollEvents("prev")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollEvents("next")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <Link to="/events" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors inline-block">
                View More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Excellence in Every Dimension */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 animate-on-scroll">Excellence in Every Dimension</h2>
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleItems(excellenceItems, excellenceIndex).map((item, index) => (
                <div 
                  key={index} 
                  className={`border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow p-6 bg-white animate-on-scroll stagger-${index + 1}`}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{truncateText(item.description, 80)}</p>
                  <Link
                  to="/excellence"
                  className="text-xs sm:text-sm text-blue-600 hover:underline font-medium"
                  aria-label={`Read more about ${item.title}`}
                  >
                    Read more
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 animate-on-scroll">
              <div className="flex gap-2">
                <button
                  onClick={() => scrollExcellence("prev")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollExcellence("next")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <Link to="/excellence" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
                View More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact at a Glance Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 animate-on-scroll">
            Our Impact at a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center animate-on-scroll stagger-1">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <CountUp end={4500} duration={1} enableScrollSpy scrollSpyOnce />+
              </div>
              <div className="text-gray-600">Student enrolled</div>
            </div>

            <div className="text-center animate-on-scroll stagger-2">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <CountUp end={25} duration={1} enableScrollSpy scrollSpyOnce />+
              </div>
              <div className="text-gray-600">Academics Progress</div>
            </div>

            <div className="text-center animate-on-scroll stagger-3">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-yellow-600 flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <CountUp end={40} duration={1} enableScrollSpy scrollSpyOnce />+
              </div>
              <div className="text-gray-600">Faculty Members</div>
            </div>

            <div className="text-center animate-on-scroll stagger-4">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <CountUp end={12} duration={1} enableScrollSpy scrollSpyOnce />+
              </div>
              <div className="text-gray-600">Year of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Booking Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Book Your
                <br />
                Instrument
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Easily reserve advanced research instruments for your experiments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking" className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent rounded-md font-medium transition-colors inline-block text-center">
                  Book
                </Link>
                <Link to="/instruments" className="px-6 py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-100 rounded-md font-medium transition-colors inline-block text-center">
                  Explore Instruments
                </Link>
              </div>
            </div>
            <div className="flex justify-center animate-on-scroll stagger-2">
              <Calendar
                onChange={setDate}
                value={date}
                locale="en-GB"
                tileClassName={getSundayClassName}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}