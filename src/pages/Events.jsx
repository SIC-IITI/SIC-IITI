import { useState } from "react"
import { Calendar, X } from "lucide-react"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const eventsItems = [
  {
  date: "14-16 May 2025",
  title: "Workshop & Hands-on Training on Advanced Microscopy",
  image: "/event1.png",
  fullDescription:
    "A 3-day hands-on workshop on Advanced Microscopy organized by the Sophisticated Instrumentation Centre, IIT Indore. The program covers key microscopy techniques including Atomic Force Microscopy (AFM), Confocal Microscopy, Field-Emission Scanning Electron Microscopy (FESEM), and Fluorescence Microscopy. The workshop also focuses on real-world applications in materials science and advanced research.",
  venue: "Sophisticated Instrumentation Centre, IIT Indore",
}
]

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text
    return text.slice(0, limit) + "..."
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Events & Workshops</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Stay updated with the latest conferences, workshops, and events.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {eventsItems.map((item, index) => (
              <div
                key={index}
                className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium mb-3">
                    {item.date}
                  </span>

                  <p className="text-sm text-gray-700 mb-4 leading-relaxed flex-grow">
                    {truncateText(item.title, 100)}
                  </p>

                  <button
                    onClick={() => setSelectedEvent(item)}
                    className="text-sm text-blue-600 hover:underline font-medium text-left"
                  >
                    Read more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-5">
              <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
              <button onClick={() => setSelectedEvent(null)}>
                <X />
              </button>
            </div>

            <div className="p-6">
              <img
                src={selectedEvent.image}
                alt=""
                className="w-full h-60 object-cover rounded-lg mb-6"
              />

              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <Calendar className="w-4 h-4" />
                {selectedEvent.date}
              </div>

              <p className="text-gray-700 mb-6">
                {selectedEvent.fullDescription}
              </p>

              <p className="text-sm text-gray-500">
                <strong>Venue:</strong> {selectedEvent.venue}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}