import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  FileText,
  Beaker,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import instrumentsData from "../../data/instrumentsData";
import { getImagesFromInstrument, getFallbackImages } from "../../utils/imageLoader";

const InstrumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedApp, setExpandedApp] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  // Find the instrument by ID
  const instrument = instrumentsData.find((item) => item.id === id);

  // Load images for the instrument
  useEffect(() => {
    if (!instrument) return;

    try {
      // Get images directly from instrumentsData
      let loadedImages = getImagesFromInstrument(instrument);

      // If no images found, use fallback
      if (loadedImages.length === 0) {
        loadedImages = getFallbackImages();
      }

      setImages(loadedImages);
    } catch (error) {
      console.error("Error loading images:", error);
      setImages(getFallbackImages());
    }
  }, [instrument, id]);

  // Auto-slide images every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Parse applications to extract numbered sections
  const parseApplications = (applications) => {
    if (!applications || applications.length === 0) return [];

    const parsed = [];
    applications.forEach((app) => {
      // Split by numbered sections (e.g., "1.", "2.", etc.)
      const sections = app.split(/(?=\d+\.\s+[A-Z])/);
      sections.forEach((section) => {
        if (section.trim()) {
          const lines = section.split("\n").filter((line) => line.trim());
          if (lines.length > 0) {
            const title = lines[0].trim();
            const content = lines.slice(1).join("\n").trim();
            parsed.push({ title, content });
          }
        }
      });
    });
    return parsed;
  };

  const parsedApplications = parseApplications(instrument?.applications);

  // If instrument not found
  if (!instrument) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <div className="text-center">
          <div className="mb-6">
            <Beaker className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Instrument Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The instrument you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/instruments")}
            className="px-8 py-3 bg-teal-400 hover:bg-teal-500 text-white font-bold rounded-md transition-colors shadow-lg"
          >
            Back to Instruments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#D9D9D9" }}>
      {/* Hero Header */}
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80')",
        }}
      >
        {/* Stars Effect */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-6">
          <button
            onClick={() => navigate("/instruments")}
            className="flex items-center gap-2 text-white hover:text-teal-400 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Instruments</span>
          </button>

          <div className="flex items-center gap-3 mb-4">
            <Beaker className="w-10 h-10 text-teal-400" />
            <h1
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "Cantata one" }}
            >
              {instrument.name}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
              {instrument.category}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Image Slideshow Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2
            className="text-3xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "Cantata one" }}
          >
            Instrument Gallery
          </h2>
          <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden bg-white border-2 border-gray-200">
            {images.length > 0 ? (
              <>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${instrument.name} view ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                    onError={(e) => {
                      console.error(`Failed to load image: ${image}`);
                      e.target.src =
                        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80";
                    }}
                  />
                ))}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prevIndex) =>
                        prevIndex === 0 ? images.length - 1 : prevIndex - 1
                      )}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prevIndex) =>
                        (prevIndex + 1) % images.length
                      )}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Slide Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/90 px-4 py-2 rounded-full shadow-lg">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-blue-600 w-8"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Loading images...</p>
              </div>
            )}
          </div>
        </div>

        {/* Model Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h2
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Cantata one" }}
            >
              Model Information
            </h2>
          </div>
          <p className="text-base text-gray-700 leading-relaxed">
            {instrument.model}
          </p>
        </div>

        {/* Features Section */}
        {instrument.features && instrument.features.length > 0 && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
            <div className="p-8">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "Cantata one" }}
              >
                Features
              </h2>
              <div className="space-y-5">
                {instrument.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed flex-1 pt-1.5 text-base whitespace-pre-line">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applications Section */}
        {parsedApplications.length > 0 && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
            <div className="p-8">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "Cantata one" }}
              >
                Applications
              </h2>
              <div className="space-y-3">
                {parsedApplications.map((app, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedApp(expandedApp === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-left text-gray-800 text-base">
                          {app.title}
                        </span>
                      </div>
                      {expandedApp === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                    </button>
                    {expandedApp === index && app.content && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {app.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty state for applications */}
        {(!instrument.applications || instrument.applications.length === 0) && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
            <div className="p-8">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "Cantata one" }}
              >
                Applications
              </h2>
              <div className="text-center py-4">
                <p className="text-gray-500 italic">
                  Application details will be added soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h2
            className="text-3xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "Cantata one" }}
          >
            Contact Information
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold">
                1
              </span>
              <div className="flex-1 pt-1.5">
                <p className="text-sm text-gray-600 mb-1 font-semibold">
                  Handled By
                </p>
                <p className="text-base text-gray-800 font-medium">
                  {instrument.handledBy}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold">
                2
              </span>
              <div className="flex-1 pt-1.5">
                <p className="text-sm text-gray-600 mb-1 font-semibold">
                  Email
                </p>
                <a
                  href={`mailto:${instrument.email}`}
                  className="text-base text-blue-600 hover:underline font-medium break-all"
                >
                  {instrument.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;