import { useState } from "react"
import { Calendar, X } from "lucide-react"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const eventsItems = [
    {
      date: "16-18 Nov 2025",
      title:
        "SAP 2025: IIT Indore to host the prestigious Symposium on Advanced Photonics, bringing together experts in light-based technologies.",
      fullDescription:
        "The Symposium on Advanced Photonics (SAP) 2025 is a premier international conference that brings together leading researchers, scientists, and industry experts in the field of photonics and light-based technologies. This three-day event will feature keynote speeches from renowned scientists, technical sessions covering cutting-edge research, poster presentations, and networking opportunities. Topics include quantum photonics, optical communications, biophotonics, laser technology, and nanophotonics. The symposium provides an excellent platform for knowledge exchange and collaboration between academia and industry.",
      venue: "Main Auditorium, IIT Indore",
    },
    {
      date: "8-12 Dec 2025",
      title:
        "ICDP Workshop: A 5-day workshop on 'Information, Communications and Data Processing' to be held at the institute.",
      fullDescription:
        "This comprehensive 5-day workshop focuses on the latest advances in information theory, communication systems, and data processing techniques. Participants will gain hands-on experience with modern signal processing tools, machine learning algorithms for data analysis, and communication protocols. The workshop includes theoretical lectures, practical lab sessions, and industry case studies. Topics covered include digital signal processing, wireless communications, data compression, error correction codes, and big data analytics. Perfect for researchers, engineers, and graduate students looking to enhance their skills in these rapidly evolving fields.",
      venue: "CSE Department, IIT Indore",
    },
    {
      date: "11-13 Dec 2025",
      title:
        "AIMTDR 2025: 10th International Conference on Manufacturing Technology, Design and Research to be hosted by Dept. of Mechanical Engineering.",
      fullDescription:
        "AIMTDR 2025 is the 10th edition of the International Conference on Advances in Materials and Manufacturing. This prestigious conference brings together researchers, academicians, and industry professionals to discuss recent developments in manufacturing processes, advanced materials, design optimization, and industrial automation. The event features plenary talks by distinguished speakers, technical paper presentations, panel discussions, and an industrial exhibition showcasing the latest manufacturing technologies. Key areas include additive manufacturing, smart manufacturing, sustainable production, CAD/CAM, robotics, and Industry 4.0 applications.",
      venue: "Mechanical Engineering Block, IIT Indore",
    },
    {
      date: "16-20 Dec 2025",
      title:
        "ICISS 2025: The International Conference on Information Systems Security will be held at IIT Indore, focusing on cybersecurity advancements.",
      fullDescription:
        "ICISS 2025 is a premier forum for presenting advances in the theory and practice of information systems security. The conference covers all aspects of information security including cryptography, network security, system security, privacy, blockchain technology, and security analytics. The event will feature invited talks by leading security experts, research paper presentations, hands-on workshops on ethical hacking and penetration testing, and discussions on emerging threats and countermeasures. Participants will have opportunities to interact with cybersecurity professionals from government, academia, and industry to discuss real-world security challenges and solutions.",
      venue: "Computer Science Block, IIT Indore",
    },
    {
      date: "15-26 Dec 2025",
      title:
        "GIAN Course: 'The Exciting Landscape of Precision Medicines and Therapeutics' course to be offered by IIT Indore.",
      fullDescription:
        "This GIAN (Global Initiative of Academic Networks) course provides a comprehensive overview of precision medicine and targeted therapeutics. The course covers genomics, proteomics, personalized medicine approaches, drug discovery, biomarker identification, and clinical applications. Distinguished international faculty will deliver lectures on cutting-edge topics including CRISPR gene editing, immunotherapy, nanomedicine, and AI in drug design. The course includes interactive sessions, case studies, and discussions on ethical considerations in precision medicine. Ideal for researchers, clinicians, and students interested in the future of healthcare and pharmaceutical sciences.",
      venue: "Biosciences Department, IIT Indore",
    },
    {
      date: "21-23 Mar 2025",
      title:
        "CSE Open-house Symposium 3.0: Featuring expert talks, coding competitions, and research presentations from the CSE department.",
      fullDescription:
        "The CSE Open-house Symposium 3.0 is an annual event showcasing the research and innovation happening in the Computer Science and Engineering department. The three-day symposium features technical talks by faculty and invited speakers, project demonstrations by students, coding competitions with exciting prizes, hackathons, and poster presentations of ongoing research. Topics span artificial intelligence, machine learning, computer vision, natural language processing, systems and networks, theoretical computer science, and more. The event provides an excellent platform for students to present their work, interact with peers, and learn about career opportunities in tech industry and research.",
      venue: "CSE Department, IIT Indore",
    },
    {
      date: "January 2026",
      title:
        "Fluxus 2026: Get ready for IIT Indore's annual techno-cultural festival, promising innovation, art, and entertainment.",
      fullDescription:
        "Fluxus 2026 is IIT Indore's flagship annual techno-cultural festival that celebrates the perfect blend of technology, art, and culture. This multi-day extravaganza features technical competitions including robotics, coding challenges, and innovation contests, alongside cultural events like music performances, dance competitions, drama, fashion shows, and art exhibitions. The festival attracts thousands of participants from colleges across India. Highlights include celebrity performances, startup exhibitions, tech talks by industry leaders, workshops, gaming tournaments, and food festivals. Fluxus embodies the spirit of creativity and innovation that defines IIT Indore.",
      venue: "IIT Indore Campus",
    },
  ]

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text
    return text.slice(0, limit) + "..."
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 sm:py-20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Events & Workshops
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl">
            Stay updated with the latest conferences, workshops, and events at the Sophisticated Instrumentation Centre
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {eventsItems.map((item, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6"
              >
                <div className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  {item.date}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                  {truncateText(item.title, 100)}
                </p>
                <button
                  onClick={() => setSelectedEvent(item)}
                  className="text-xs sm:text-sm text-blue-600 hover:underline font-medium"
                >
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-8">
                {selectedEvent.title}
              </h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Calendar className="w-4 h-4" />
                  {selectedEvent.date}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About this Event
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedEvent.fullDescription}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Venue</p>
                    <p className="text-sm text-gray-600">{selectedEvent.venue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}