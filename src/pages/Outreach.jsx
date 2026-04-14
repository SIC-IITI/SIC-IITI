import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

function Outreach() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const carouselImages = [
    "/visit.png",
    "/masters-visit.png",
    "/sic-army-visit.png",
    "/saumya-gupta.png",
    "/sic-ppl.png",
    "/outreach-sic.jpeg",
    "/sic-ppl2.png"
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const visitors = [
    {
      date: "Oct 15, 2025",
      title: "Prof Irina A. Kurzina VISIT SIC",
      description: "Professor from Tomsk state university, Russia Visit SIC",
      image: "/visit.png"
    },
    {
      date: "Oct 14, 2025",
      title: "Masters students from IPS academy Indore visit to SIC",
      image: "/masters-visit.png"
    },
    {
      date: "July 24, 2025",
      title: "FOREIGN ARMY OFFICERS VISIT SIC",
      description: "Under MCTE MHOW",
      image: "/sic-army-visit.png"
    },
    {
      date: "June 6, 2025",
      title: "Visit of Ms. Saumya Gupta IAS",
      description: "Visit of Ms. Saumya Gupta IAS ,Joint secretary Technical Education, MoE , GoI",
      image: "/saumya-gupta.png"
    },
    {
      date: "July 15, 2024",
      title: "Send off function for Ms. Mitali Dave",
      image: "/sic-ppl.png"
    },
    {
      date: "May 30, 2024",
      title: "Visit of Dr. K. Sivan",
      description: "BOG Chairman IIT Indore and Former Chairman ISRO visit to SIC",
      image: "/outreach-sic.jpeg"
    },
    {
      date: "December 22, 2022",
      title: "Foreign students visit under exchange program",
      image: "/sic-ppl2.png"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-white py-10 sm:py-12 border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Outreach Activities For School and College Students
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              To create awareness of recent developments in Science and Technology and the applications of sophisticated instruments in basic and applied research.
            </p>
          </div>
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

          {/* ✅ MOBILE SWIPE CAROUSEL */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth lg:hidden">
            {carouselImages.map((img, index) => (
              <div key={index} className="min-w-full snap-center flex-shrink-0">
                <img
                  src={img}
                  alt={`slide-${index}`}
                  className="w-full h-56 sm:h-64 object-contain bg-gray-100 rounded-lg shadow-md border-4 border-blue-400"
                />
              </div>
            ))}
          </div>

          {/* ✅ DESKTOP BUTTON CAROUSEL */}
          <div className="hidden lg:flex items-center justify-center gap-4">

            <button
              onClick={prevImage}
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 shadow-lg flex items-center justify-center"
            >
              <ChevronLeft />
            </button>

            <div className="relative flex-1 max-w-4xl">
              <img
                src={carouselImages[currentImageIndex]}
                alt="carousel"
                className="w-full h-96 object-contain bg-gray-100 rounded-lg shadow-md border-4 border-blue-400"
              />

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex
                        ? "bg-blue-600 w-6"
                        : "bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextImage}
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 shadow-lg flex items-center justify-center"
            >
              <ChevronRight />
            </button>
          </div>

        </div>
      </section>

      {/* EVENTS */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              SIC Visitors & Event Highlights
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              An awareness program is initiated by SIC for our SCHOOL AND COLLEGE STUDENTS.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {visitors.map((visitor, index) => (
              <div
                key={index}
                className={`bg-white border-2 ${
                  index % 2 === 0 ? "border-blue-400" : "border-gray-200"
                } rounded-lg overflow-hidden hover:shadow-lg transition`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3">

                  <img
                    src={visitor.image}
                    alt={visitor.title}
                    className="w-full h-48 md:h-full object-cover"
                  />

                  <div className="p-4 sm:p-6 md:p-8 md:col-span-2">
                    <div className="text-blue-600 font-semibold text-base mb-2">
                      {visitor.date}
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {visitor.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base">
                      {visitor.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}

export default Outreach