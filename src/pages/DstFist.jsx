import React from "react"

export default function DstFist() {
  const instruments = [
    {
      title: "500 MHz NMR",
      department: "Department of Chemistry",
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=500+MHz+NMR",
    },
    {
      title: "Raman Spectroscopy",
      department: "Department of Physics",
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Raman+Spectroscopy",
    },
    {
      title: "Universal Testing Machine",
      department: "Department of MEMS",
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Universal+Testing+Machine",
    },
    {
      title: "Real Time Digital Simulation",
      department: "Department of Electrical Engineering",
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Real+Time+Simulation",
    },
    {
      title: "Ultracentrifuge",
      department: "Department of BSBE",
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Ultracentrifuge",
    },
    {
      title: "GPU-Server",
      department: "Department of BSBE",
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=GPU-Server",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">DST-FIST Facilities</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            State-of-the-art sponsored instruments available across various departments.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {instruments.map((item, index) => (
              <div
                key={index}
                className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Placeholder */}
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium mb-3 w-max">
                    {item.department}
                  </span>

                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex-grow">
                    {item.title}
                  </h3>

                  <a
                    href="https://people.iiti.ac.in/~nkjain/facilities.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline font-medium text-left mt-auto"
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