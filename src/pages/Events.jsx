import { useState } from "react"
import { Calendar, Award } from "lucide-react"

export default function EventsAndExcellence() {
  const [activeTab, setActiveTab] = useState("all")

  const eventsItems = [
    {
      date: "16-18 Nov 2025",
      title:
        "SAP 2025: IIT Indore to host the prestigious Symposium on Advanced Photonics, bringing together experts in light-based technologies.",
      category: "events",
    },
    {
      date: "8-12 Dec 2025",
      title:
        "ICDP Workshop: A 5-day workshop on 'Information, Communications and Data Processing' to be held at the institute.",
      category: "events",
    },
    {
      date: "11-13 Dec 2025",
      title:
        "AIMTDR 2025: 10th International Conference on Manufacturing Technology, Design and Research to be hosted by Dept. of Mechanical Engineering.",
      category: "events",
    },
    {
      date: "16-20 Dec 2025",
      title:
        "ICISS 2025: The International Conference on Information Systems Security will be held at IIT Indore, focusing on cybersecurity advancements.",
      category: "events",
    },
    {
      date: "15-26 Dec 2025",
      title:
        "GIAN Course: 'The Exciting Landscape of Precision Medicines and Therapeutics' course to be offered by IIT Indore.",
      category: "events",
    },
    {
      date: "21-23 Mar 2025",
      title:
        "CSE Open-house Symposium 3.0: Featuring expert talks, coding competitions, and research presentations from the CSE department.",
      category: "events",
    },
    {
      date: "January 2026",
      title:
        "Fluxus 2026: Get ready for IIT Indore's annual techno-cultural festival, promising innovation, art, and entertainment.",
      category: "events",
    },
  ]

  const excellenceItems = [
    {
      image: "/sic-ppl.png",
      title: "Research Innovation",
      description:
        "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
      category: "excellence",
    },
    {
      image: "/sic-ppl2.png",
      title: "Academic Excellence",
      description:
        "Fostering a culture of academic excellence through state-of-the-art facilities and expert guidance.",
      category: "excellence",
    },
    {
      image: "/sic-ppl.png",
      title: "Industry Collaboration",
      description:
        "Strengthening partnerships with industry leaders to drive innovation and real-world impact.",
      category: "excellence",
    },
    {
      image: "/sic-ppl2.png",
      title: "Student Development",
      description:
        "Empowering students with hands-on experience and access to advanced instrumentation.",
      category: "excellence",
    },
  ]

  const allItems = [
    ...eventsItems.map((item) => ({ ...item, type: "events" })),
    ...excellenceItems.map((item) => ({ ...item, type: "excellence" })),
  ]

  const getFilteredItems = () => {
    if (activeTab === "all") return allItems
    if (activeTab === "events") return eventsItems
    if (activeTab === "excellence") return excellenceItems
    return allItems
  }

  const filteredItems = getFilteredItems()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 sm:py-20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Events and Excellence
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl">
            Stay updated with the latest happenings, achievements, and upcoming
            events at the Sophisticated Instrumentation Centre
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex gap-2 overflow-x-auto py-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === "events"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Events & Workshops
            </button>

            <button
              onClick={() => setActiveTab("excellence")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === "excellence"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Award className="w-4 h-4" />
              Excellence
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredItems.length}</span>{" "}
              {activeTab === "all" ? "items" : activeTab}
            </p>
          </div>

          {/* Excellence Grid */}
          {(activeTab === "excellence" ||
            (activeTab === "all" &&
              filteredItems.some((item) => item.type === "excellence"))) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems
                .filter(
                  (item) => activeTab === "excellence" || activeTab === "all"
                )
                .map(
                  (item, index) =>
                    item.image && (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )
                )}
            </div>
          )}

          {/* Events List */}
          {(activeTab === "events" || activeTab === "all") && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredItems
                .filter((item) => item.category === "events")
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="inline-block px-4 py-1 rounded-full text-xs font-medium mb-3 bg-green-100 text-green-800">
                          {item.date}
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {item.title}
                        </p>
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline">
                          Read more →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No items found
              </h3>
              <p className="text-gray-600">Check back later for updates</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
