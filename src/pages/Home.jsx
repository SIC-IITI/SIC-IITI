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
const [touchStart, setTouchStart] = useState(null)
const [touchEnd, setTouchEnd] = useState(null)

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



  // NEW HERO IMAGES
  const heroImages = [
    { src: "/assets/slider/nmr500.png", id: "nmr-500" },
    { src: "/assets/slider/lc-hrms.png", id: "lc-hrms" },
    { src: "/assets/slider/gc-ms.png", id: "gc-ms" },
    { src: "/assets/slider/clsm.png", id: "clsm" },
    { src: "/assets/slider/bet.png", id: "bet-surface-area" },
    { src: "/assets/slider/tga.png", id: "tga" },
    { src: "/assets/slider/dsc.png", id: "dsc" },
    { src: "/assets/slider/hplc.png", id: "hplc-rp" },
    { src: "/assets/instruments/Microscopy/Gemini-360/mg1.png", id: "gemini-360" },
    { src: "/assets/instruments/Microscopy/AFM/ma1.png", id: "afm" },
    { src: "/assets/instruments/Microscopy/CLSM/mc1.png", id: "clsm" },
    { src: "/assets/instruments/Microscopy/Supra-55/ms1.png", id: "supra-55" },
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextHeroImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
  }

  const prevHeroImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const eventsItems = [
    {
      image: "/event1.png",
      date: "14-16 May 2025",
      title: "Workshop & Hands-on Training on Advanced Microscopy at IIT Indore focusing on AFM, FESEM, Confocal and Fluorescence techniques.",
    },

  ]

  const excellenceItems = [

  ]
  const canScroll = eventsItems.length > 4

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text
    return text.slice(0, limit) + "..."
  }

  const scrollEvents = (direction) => {
    if (eventsItems.length <= 4) return

    if (direction === "next") {
      setEventsIndex((prev) => (prev + 1) % eventsItems.length)
    } else {
      setEventsIndex((prev) => (prev - 1 + eventsItems.length) % eventsItems.length)
    }
  }

  const getVisibleItems = (items, currentIndex) => {
    if (items.length <= 4) return items

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
const handleTouchStart = (e) => {
  setTouchStart(e.targetTouches[0].clientX)
}

const handleTouchMove = (e) => {
  setTouchEnd(e.targetTouches[0].clientX)
}

const handleTouchEnd = () => {
  if (!touchStart || !touchEnd) return

  const distance = touchStart - touchEnd

  if (distance > 50) nextHeroImage()   // swipe left
  if (distance < -50) prevHeroImage()  // swipe right
}
  return (
    <div className="min-h-screen bg-white home-page-wrapper">

      {false && (
        <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden group">
          {/* Image Container with Fade Transitions */}
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                style={{ backgroundImage: `url("${image}")` }}
              />
            ))}
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={prevHeroImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/20 text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={nextHeroImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/20 text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/50 mix-blend-multiply pointer-events-none" aria-hidden="true" />

          {/* Content Overlay */}
          <div className="relative z-20 container mx-auto px-6 sm:px-8 lg:px-12 xl:px-28 h-full flex items-center">
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
                <Link to="/instruments">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
                    Explore
                  </button>
                </Link>
                <Link to="/booking">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
                    Book
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/60 hover:bg-white/80'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* --- NEW HERO SECTION (IMAGES ONLY) --- */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] bg-white overflow-hidden group">
        {/* Image Container with Fade Transitions */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100 z-10" : "opacity-0"
                }`}
            >
              <Link to={`/instruments/${image.id}`}>
                <div
                  className="w-full h-full bg-contain bg-center bg-no-repeat cursor-pointer"
                  style={{ backgroundImage: `url("${image.src}")` }}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Left Navigation Arrow */}
        <button
          onClick={prevHeroImage}
          className="absolute  sm:block left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100 shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={nextHeroImage}
          className="absolute  sm:block right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100 shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${index === currentImageIndex ? 'bg-black w-8' : 'bg-black/30 hover:bg-black/60'
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
      {/* Message from Head - SIC */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">

          {/* Heading */}
          <div className="text-center mb-12 animate-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-20 bg-gray-300" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Message from Head – SIC
              </h2>
              <div className="h-px w-20 bg-gray-300" />
            </div>
            <p className="text-sm text-gray-500">
              Professor in Charge | Sophisticated Instrumentation Centre – A National Facility
            </p>
          </div>

          {/* Main Card */}
          <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 animate-on-scroll">

            <div className="grid md:grid-cols-3 gap-8 items-center">

              {/* LEFT: Image */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="/assets/FacultyPhotos/Team_1.png"
                  alt="Head of SIC"
                  className="w-60 h-60 rounded-18 object-cover shadow-md mb-4"
                />

                <h3 className="font-semibold text-gray-900">
                  Prof. Apurba K. Das
                </h3>
                <p className="text-sm text-gray-500">
                  Professor In Charge, SIC
                </p>
              </div>

              {/* RIGHT: Message */}
              <div className="md:col-span-2 text-gray-700 leading-relaxed text-justify space-y-4">

                {/* Quote icon */}
                <p className="text-4xl text-gray-300 leading-none">“</p>

                <p>
                  The Sophisticated Instrumentation Centre (SIC) at IIT Indore, Simrol campus, is equipped with state-of-the-art, high-end instruments facilities that enable researchers to explore advanced instruments in all disciplines. The facility houses well-established facilities including chromatography, microscopy, spectroscopy, X-ray characterization, thermal analysis, optical and physical property characterization.
                </p>

                <p>
                  These advanced facilities are extensively used by undergraduate and postgraduate students, research scholars, and faculty members to support cutting-edge research. In addition, the Centre extends its services to external users such as industries, national laboratories, research organizations, and academic institutions on payment basis.
                </p>

                {/* Signature */}
                <div className="pt-4">
                  <p className="font-semibold text-gray-900">
                    — Professor In Charge
                  </p>
                </div>

              </div>
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
            <div className={`grid gap-6
  ${eventsItems.length === 1 ? "grid-cols-1 max-w-md mx-auto" : ""}
  ${eventsItems.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" : ""}
  ${eventsItems.length >= 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""}
`}>
              {getVisibleItems(eventsItems, eventsIndex).map((item, index) => (
                <div
                  key={index}
                  className={`border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6 bg-white animate-on-scroll stagger-${index + 1}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
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
                  disabled={!canScroll}
                  className={`w-10 h-10 rounded-full flex items-center justify-center
    ${canScroll ? "bg-black hover:bg-gray-800 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollEvents("next")}
                  disabled={!canScroll}

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
                <CountUp end={1000} duration={1} enableScrollSpy scrollSpyOnce />+
              </div>
              <div className="text-gray-600">Students Users</div>
            </div>

            <div className="text-center animate-on-scroll stagger-2">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <CountUp end={7} duration={1} enableScrollSpy scrollSpyOnce />+
              </div>
              <div className="text-gray-600">Total departments</div>
            </div>

            <div className="text-center animate-on-scroll stagger-3">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-yellow-600 flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <CountUp end={100} duration={1} enableScrollSpy scrollSpyOnce />+
              </div>
              <div className="text-gray-600">Faculty Users</div>
            </div>

            <div className="text-center animate-on-scroll stagger-4">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <CountUp end={14} duration={1} enableScrollSpy scrollSpyOnce />+
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

      {/* SIC Virtual Tour Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-12 md:mb-16 animate-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-20 sm:w-24 bg-gray-300" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">SIC Virtual Tour</h2>
              <div className="h-px w-20 sm:w-24 bg-gray-300" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Take a virtual walk through our state-of-the-art facilities and explore the advanced instrumentation available for research and innovation.
            </p>
          </div>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl animate-on-scroll stagger-2">
            <div className="aspect-video relative">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/IDo-YS_Bq-w?si=Slpj7ejr45PwZDk1"
                title="SIC Virtual Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}