import { useState } from "react"
import { X, Sparkles, Award, TrendingUp, Target, BookOpen, Lightbulb } from "lucide-react"

export default function ExcellencePage() {
  const [selectedItem, setSelectedItem] = useState(null)

  const excellenceItems = [
    {
      image: "/sic-ppl.png",
      title: "Research Innovation",
      description:
        "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
      fullDescription:
        "Our Research Innovation program represents the pinnacle of scientific excellence at the Sophisticated Instrumentation Centre. We are committed to pushing the boundaries of knowledge through groundbreaking research in materials science, nanotechnology, biotechnology, and advanced manufacturing. Our state-of-the-art facilities house cutting-edge instruments including electron microscopes, spectroscopy equipment, and advanced imaging systems that enable researchers to explore phenomena at the molecular and atomic level.\n\nOur interdisciplinary approach brings together experts from various fields to tackle complex challenges facing society today. From developing new materials for renewable energy to advancing medical diagnostics, our research has real-world impact. We have published over 500 research papers in top-tier international journals and hold numerous patents for innovative technologies.\n\nThe centre fosters collaboration between faculty, students, and industry partners, creating an ecosystem where ideas flourish and transform into tangible solutions. Our researchers have access to extensive computational resources, specialized laboratories, and mentorship from leading scientists in their fields.",
      icon: Sparkles,
    },
    {
      image: "/sic-ppl2.png",
      title: "Academic Excellence",
      description:
        "Fostering a culture of academic excellence through state-of-the-art facilities and expert guidance.",
      fullDescription:
        "Academic Excellence at SIC is built on a foundation of rigorous training, world-class infrastructure, and dedicated faculty mentorship. We offer comprehensive training programs that combine theoretical knowledge with hands-on practical experience on advanced instrumentation. Our curriculum is designed to prepare students and researchers for careers in academia, industry, and research organizations.\n\nWe conduct regular workshops, seminars, and training sessions on sophisticated analytical techniques, data interpretation, and instrument operation. Our faculty members are recognized experts in their respective fields, bringing decades of experience and cutting-edge knowledge to the classroom and laboratory.\n\nThe centre has trained over 5,000 students and researchers from across India and internationally. Our alumni hold prestigious positions in leading universities, research institutions, and Fortune 500 companies worldwide. We maintain strong industry connections that provide students with internship opportunities, collaborative research projects, and placement assistance.\n\nOur commitment to academic excellence extends beyond technical training to include research ethics, scientific communication, and professional development, ensuring our graduates are well-rounded professionals ready to make significant contributions to their fields.",
      icon: Award,
    },
    {
      image: "/sic-ppl.png",
      title: "Industry Collaboration",
      description:
        "Strengthening partnerships with industry leaders to drive innovation and real-world impact.",
      fullDescription:
        "Our Industry Collaboration initiatives bridge the gap between academic research and industrial applications. We work closely with leading companies across sectors including pharmaceuticals, electronics, materials, automotive, and energy to solve real-world technical challenges. These partnerships enable technology transfer, joint research projects, and consultancy services that benefit both academia and industry.\n\nThe SIC serves as a testing and characterization facility for industries, offering access to sophisticated analytical instruments and expert technical support. Companies leverage our capabilities for quality control, failure analysis, product development, and research support. This mutually beneficial relationship provides industries with access to cutting-edge technology while giving our students and researchers exposure to practical problems and industry standards.\n\nWe have established memorandums of understanding (MOUs) with over 100 companies and research organizations. Our industry partners include multinational corporations, government laboratories, and innovative startups. These collaborations have resulted in numerous successful technology transfers, patent licensing agreements, and sponsored research projects.\n\nThrough industry-sponsored fellowships, internships, and collaborative research programs, we ensure that our academic pursuits remain aligned with market needs and contribute meaningfully to economic development and technological advancement.",
      icon: TrendingUp,
    },
    {
      image: "/sic-ppl2.png",
      title: "Student Development",
      description:
        "Empowering students with hands-on experience and access to advanced instrumentation.",
      fullDescription:
        "Student Development is at the heart of our mission. We believe that providing students with early exposure to sophisticated instrumentation and research methodologies is crucial for nurturing the next generation of scientists and engineers. Our comprehensive student development programs include instrument training, research internships, project guidance, and skill development workshops.\n\nStudents have the opportunity to work on real research projects, using equipment worth millions of dollars that they typically wouldn't access until graduate school or industry employment. This hands-on experience builds confidence, technical competence, and problem-solving skills. We encourage undergraduate students to participate in research activities, present their work at conferences, and co-author research publications.\n\nOur mentorship program pairs students with experienced researchers and faculty members who guide them through their academic journey and help them navigate career choices. We organize regular seminars, journal clubs, and discussion sessions where students can interact with visiting scientists and learn about cutting-edge developments in various fields.\n\nThe centre also focuses on developing soft skills including scientific writing, presentation skills, research ethics, and project management. Through our placement assistance program and industry connections, we help students secure positions in top companies and research institutions. Many of our student alumni have gone on to pursue PhDs at prestigious universities worldwide or have joined leading technology companies.",
      icon: Target,
    },
    {
      image: "/sic-ppl.png",
      title: "Technical Training",
      description:
        "Comprehensive training programs on advanced analytical techniques and instrumentation.",
      fullDescription:
        "Our Technical Training programs are designed to build expertise in operating and maintaining sophisticated scientific instruments. We offer specialized courses on electron microscopy, spectroscopy, chromatography, thermal analysis, and surface characterization techniques. Each training module combines theoretical foundations with extensive hands-on practice, ensuring participants gain confidence in using complex equipment.\n\nTraining sessions are conducted by experienced scientists and instrument specialists who share practical tips, troubleshooting techniques, and best practices developed over years of operation. We maintain small batch sizes to ensure personalized attention and adequate instrument access for each participant.\n\nOur certification programs are recognized by industries and research institutions nationwide. Participants receive comprehensive training manuals, access to online resources, and continued support even after course completion. We also offer customized training programs tailored to specific industry requirements or research needs.",
      icon: BookOpen,
    },
    {
      image: "/sic-ppl2.png",
      title: "Innovation & Patents",
      description:
        "Supporting innovation through patent filing, technology transfer, and commercialization guidance.",
      fullDescription:
        "The Innovation & Patents initiative supports researchers in transforming their discoveries into tangible innovations. We provide guidance on patent filing, intellectual property protection, technology commercialization, and startup formation. Our experienced team helps researchers navigate the complex process from invention disclosure to patent grant.\n\nWe have established an innovation ecosystem that includes incubation facilities, seed funding opportunities, mentorship from successful entrepreneurs, and connections to venture capital firms. Several startups have emerged from research conducted at our facilities, creating jobs and contributing to economic growth.\n\nOur technology transfer office facilitates licensing agreements between researchers and industry partners, ensuring that innovations reach the market and benefit society. We conduct regular workshops on entrepreneurship, innovation management, and commercialization strategies to build an innovation-oriented mindset among students and researchers.",
      icon: Lightbulb,
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
            Excellence in Every Dimension
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 max-w-3xl">
            Discover our commitment to research innovation, academic excellence, and impactful collaborations
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {excellenceItems.map((item, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow p-6 bg-white"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {truncateText(item.description, 80)}
                </p>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
            {/* Header with Image */}
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedItem.title}
                </h2>
              </div>
            </div>

            <div className="p-6">
              {/* Full Description */}
              <div className="mb-6">
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {selectedItem.fullDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}