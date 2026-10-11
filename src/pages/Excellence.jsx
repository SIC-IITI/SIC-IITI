import { useState } from "react"
import { useTranslation } from "react-i18next"
import { X, Sparkles, Award, TrendingUp, Target, BookOpen, Lightbulb } from "lucide-react"

export default function ExcellencePage() {
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] = useState(null)

  const excellenceItems = [
    {
      image: "/assets/outreach/sic-ppl.png",
      title: t('excellence.item1Title'),
      description: t('excellence.item1Desc'),
      fullDescription: t('excellence.item1Full'),
      icon: Sparkles,
    },
    {
      image: "/assets/outreach/sic-ppl2.png",
      title: t('excellence.item2Title'),
      description: t('excellence.item2Desc'),
      fullDescription: t('excellence.item2Full'),
      icon: Award,
    },
    {
      image: "/assets/outreach/sic-ppl.png",
      title: t('excellence.item3Title'),
      description: t('excellence.item3Desc'),
      fullDescription: t('excellence.item3Full'),
      icon: TrendingUp,
    },
    {
      image: "/assets/outreach/sic-ppl2.png",
      title: t('excellence.item4Title'),
      description: t('excellence.item4Desc'),
      fullDescription: t('excellence.item4Full'),
      icon: Target,
    },
    {
      image: "/assets/outreach/sic-ppl.png",
      title: t('excellence.item5Title'),
      description: t('excellence.item5Desc'),
      fullDescription: t('excellence.item5Full'),
      icon: BookOpen,
    },
    {
      image: "/assets/outreach/sic-ppl2.png",
      title: t('excellence.item6Title'),
      description: t('excellence.item6Desc'),
      fullDescription: t('excellence.item6Full'),
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
        <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            {t('excellence.title')}
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 max-w-3xl">
            {t('excellence.subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50">
        <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
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
                  {t('excellence.readMore')}
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
