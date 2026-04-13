import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

function Outreach() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const carouselImages = [

    "/director.png",
    "/sic-ppl2.png",
    "/close-sic.png",
    "/sic.png"
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
    }, {
      date: "Oct 14, 2025",
      title: "Masters students from IPS academy Indore visit to SIC",
      image: "/masters-visit.png"
    }, {
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
      description: " Ujjain, visit as 'Ek Bharat Shresht Bharat Abhiyan.'",
      image: "/sic-ppl2.png"
    },

  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-8  border-gray-200">
        <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Outreach Activities For School and College Students
            </h1>
            <p className="text-base sm:text-md text-gray-600 leading-relaxed">
              To create awareness of recent developments in Science and Technology and the applications of sophisticated instruments in basic and applied research.
            </p>
          </div>
        </div>
      </section>

      {/* Main Image Section with Carousel */}
      <section className="py-5 sm:py-7 bg-white">
        <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            {/* New flex wrapper for laptop layout */}
            <div className="flex items-center justify-center gap-2 lg:gap-4">

              {/* Previous Button (Laptop) */}
              <button
                onClick={prevImage}
                className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-gray-900 shadow-lg transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Original relative container, now a flex item */}
              <div className="relative flex-1">
                <img
                  src={carouselImages[currentImageIndex]}
                  alt="Outreach Activities"
                  className="w-full h-80 sm:h-80 md:h-96 object-contain bg-gray-100 rounded-lg shadow-md border-4 border-blue-400"
                />

                {/* Previous Button (Mobile) - now hidden on large screens */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center shadow-lg transition-colors lg:hidden"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Next Button (Mobile) - now hidden on large screens */}
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-center shadow-lg transition-colors lg:hidden"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Indicators (Unchanged) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                        ? 'bg-blue-600 w-6'
                        : 'bg-white/70 hover:bg-white'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Next Button (Laptop) */}
              <button
                onClick={nextImage}
                className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-gray-900 shadow-lg transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SIC Visitors & Event Highlights Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
       

          {/* Events Grid */}
          <div className="max-w-6xl mx-auto space-y-6">
            {visitors.map((visitor, index) => (
              <div
                key={index}
                className={`bg-white border-2 ${index % 2 === 0 ? 'border-blue-400' : 'border-gray-200'} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}
              >
                <div className={`grid md:grid-cols-3 gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`md:col-span-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={visitor.image}
                      alt={visitor.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className={`md:col-span-2 p-6 sm:p-8 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="text-blue-600 font-semibold text-lg mb-3">
                      {visitor.date}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {visitor.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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