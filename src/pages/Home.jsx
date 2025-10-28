"use client"

import { useState } from "react"
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [newsIndex, setNewsIndex] = useState(0)
  const [eventsIndex, setEventsIndex] = useState(0)
  const [excellenceIndex, setExcellenceIndex] = useState(0)

  const newsItems = [
    {
      date: "5th December",
      title:
        "Let's celebrate this special moment with joy, laughter, and togetherness, making memories that will last a life time!",
    },
    {
      date: "5th December",
      title:
        "Let's celebrate this special moment with joy, laughter, and togetherness, making memories that will last a life time!",
    },
    {
      date: "5th December",
      title:
        "Let's celebrate this special moment with joy, laughter, and togetherness, making memories that will last a life time!",
    },
    {
      date: "5th December",
      title:
        "Let's celebrate this special moment with joy, laughter, and togetherness, making memories that will last a life time!",
    },
  ]

  const eventsItems = [
    {
      date: "5th December",
      title:
        "Let's celebrate this special moment with joy, laughter, and togetherness, making memories that will last a life time!",
    },
    {
      date: "5th December",
      title:
        "Let's celebrate this special moment with joy, laughter, and togetherness, making memories that will last a life time!",
    },
    {
      date: "5th December",
      title:
        "Let's celebrate this special moment with joy, laughter, and togetherness, making memories that will last a life time!",
    },
    {
      date: "5th December",
      title:
        "Let's celebrate this special moment with joy, laughter, and togetherness, making memories that will last a life time!",
    },
  ]

  const excellenceItems = [
    {
      image: "/sic-ppl.png",
      title: "Research Innovation",
      description: "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
    },
    {
      image: "/sic-ppl2.png",
      title: "Research Innovation",
      description: "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
    },
    {
      image: "/sic-ppl.png",
      title: "Research Innovation",
      description: "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
    },
    {
      image: "/sic-ppl2.png",
      title: "Research Innovation",
      description: "Cutting-edge research initiatives driving technological advancement and scientific discovery.",
    },
  ]

  const scrollNews = (direction) => {
    if (direction === "next") {
      setNewsIndex((prev) => (prev + 1) % newsItems.length)
    } else {
      setNewsIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length)
    }
  }

  const scrollEvents = (direction) => {
    if (direction === "next") {
      setEventsIndex((prev) => (prev + 1) % eventsItems.length)
    } else {
      setEventsIndex((prev) => (prev - 1 + eventsItems.length) % eventsItems.length)
    }
  }

  const scrollExcellence = (direction) => {
    if (direction === "next") {
      setExcellenceIndex((prev) => (prev + 1) % excellenceItems.length)
    } else {
      setExcellenceIndex((prev) => (prev - 1 + excellenceItems.length) % excellenceItems.length)
    }
  }

  const getVisibleItems = (items, currentIndex) => {
    const visible = []
    for (let i = 0; i < 4; i++) {
      visible.push(items[(currentIndex + i) % items.length])
    }
    return visible
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] bg-gradient-to-r from-blue-50 to-blue-100">
        <div
          className="absolute inset-0 bg-cover  "
          style={{ backgroundImage: 'url("/sic.png")' }}
        />
        <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-28 h-full flex items-center">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome To
              <br />
              Sophisticated
              <br />
              Instrumentation Centre
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white mb-8 leading-relaxed max-w-2xl">
              Empowering minds, fostering innovation, and shaping the future through world-class education and
              groundbreaking research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto" asChild>
                <Link to="/instruments">Explore</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent w-full sm:w-auto"
                asChild
              >
                <Link to="/booking">Book</Link>
              </Button>
            </div>
          </div>
          
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-20 sm:w-24 bg-gray-300" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">About</h2>
              <div className="h-px w-20 sm:w-24 bg-gray-300" />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Sophisticated Instrumentation Center</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                The Sophisticated Instrumentation Center (SIC) — A National Facility was established in September 2011 to expedite the research program at IIT Indore. It is now a national facility providing services such as data recording facilities and expertise in different state-of-the-art instruments to academia and industry from all parts of the country and some international centers.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                Furthermore,  it is catering to the needs of many educational institutes and industries in and around central India and satisfying the need of scientific world, academia and industries with equal importance and emphasis. It is also engaged in spreading awareness among researchers, academia and industries for the probable use of the facility among diverse users to make the facility a part of our mutual co-existence to enhance quality of researches and products in industries. 
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="/close-sic.png" 
                alt="Laboratory" 
                className="rounded-lg shadow-lg w-full max-w-md object-cover h-80 md:h-96" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Excellence in Every Dimension */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Excellence in Every Dimension</h2>
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleItems(excellenceItems, excellenceIndex).map((item, index) => (
                <Card key={index} className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                    <button className="text-sm text-blue-600 hover:underline font-medium">Read more</button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => scrollExcellence("prev")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollExcellence("next")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white border-t-4 border-blue-600">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">News</h2>
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleItems(newsItems, newsIndex).map((item, index) => (
                <Card key={index} className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
                      {item.date}
                    </div>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">{item.title}</p>
                    <button className="text-sm text-blue-600 hover:underline font-medium">Read more</button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => scrollNews("prev")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollNews("next")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Events & Workshops Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-10 md:mb-12">Events & Workshops</h2>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {getVisibleItems(eventsItems, eventsIndex).map((item, index) => (
                <Card key={index} className="border-2 border-gray-200 bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-5 md:p-6">
                    <div className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                      {item.date}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">{item.title}</p>
                    <button className="text-xs sm:text-sm text-blue-600 hover:underline font-medium">Read more</button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => scrollEvents("prev")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollEvents("next")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}