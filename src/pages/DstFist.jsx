import React from "react"

export default function DstFist() {
  const instruments = [
    {
      title: "500 MHz NMR",
      department: "Department of Chemistry",
      image: "/assets/dst/nmr.png",
      link: "https://chemistry.iiti.ac.in/500mhz-nmr", // Chemistry Dept
    },
    {
      title: "Raman Spectroscopy",
      department: "Department of Physics",
      image: "/assets/dst/raman.png",
      link: "https://physics.iiti.ac.in/research-facility/", // Physics Dept
    },
    {
      title: "Universal Testing Machine",
      department: "Department of MEMS",
      image: "/assets/dst/utm.png",
      link: "https://mems.iiti.ac.in/", // MEMS
    },
    {
      title: "Real Time Digital Simulation",
      department: "Department of Electrical Engineering",
      image: "/assets/dst/rtg.png",
      link: "https://ee.iiti.ac.in/", // Electrical Engg
    },
    {
      title: "Ultracentrifuge",
      department: "Department of BSBE",
      image: "/assets/dst/ult.png",
      link: "https://bsbe.iiti.ac.in/", // BSBE
    },
    {
      title: "GPU-Server",
      department: "Department of BSBE",
      image: "/assets/dst/gpu.png",
      link: "https://bsbe.iiti.ac.in/", // BSBE
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">DST-FIST Facilities</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            State-of-the-art sponsored instruments available across various departments.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {instruments.map((item, index) => (
              <div
                key={index}
                className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Image */}
                <div className="overflow-hidden flex justify-center items-center py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-40 h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col items-center flex-grow">
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium mb-3">
                    {item.department}
                  </span>

                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>

                  <a
                    href={item.link}
                    className="text-sm text-blue-600 hover:underline font-medium mt-auto"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}