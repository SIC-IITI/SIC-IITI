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
  Phone,
} from "lucide-react";
import instrumentsData from "../../data/instrumentsData";
import {
  getImagesFromInstrument,
  getFallbackImages,
} from "../../utils/imageloader";

const InstrumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedApp, setExpandedApp] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  const instrument = instrumentsData.find((item) => item.id === id);

  useEffect(() => {
    if (!instrument) return;

    try {
      let loadedImages = getImagesFromInstrument(instrument);
      if (loadedImages.length === 0) {
        loadedImages = getFallbackImages();
      }
      setImages(loadedImages);
    } catch (error) {
      console.error("Error loading images:", error);
      setImages(getFallbackImages());
    }
  }, [instrument, id]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const parseApplications = (applications) => {
    if (!applications || applications.length === 0) return [];

    const parsed = [];
    applications.forEach((app) => {
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

  if (!instrument) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
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
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="mb-4 sm:mb-6">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2"
            style={{ fontFamily: "Cantata one" }}
          >
            {instrument.name}
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-black">
            ({instrument.fullName})
          </div>
        </div>

        {/* Model Section */}
        <div className="mb-3">
          <p className="text-black text-base sm:text-lg md:text-xl">
            {instrument.model}
          </p>
        </div>

        <div className="flex items-center text-black mb-6 sm:mb-8">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/10 rounded-full font-semibold text-sm sm:text-base">
            {instrument.category}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl ">
        {/* Image Slideshow Section */}
        <div className="mb-8 sm:mb-12 sm:px-6 lg:px-20">
          <div className="relative w-96 max-w-4xl  h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden ">
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
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Loading images...</p>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        {instrument.features && instrument.features.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-20 py-6 sm:py-8 mb-8 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6"
              style={{ fontFamily: "Cantata one" }}
            >
              About the Instrument
            </h2>

            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700">
              {instrument.features.map((feature, index) => (
                <li key={index} className="text-base sm:text-lg whitespace-pre-line">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Applications Section */}
        {instrument.applications && instrument.applications.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-20 mb-8 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6"
              style={{ fontFamily: "Cantata one" }}
            >
              Applications
            </h2>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700">
              {instrument.applications.map((app, index) => (
                <li key={index} className="text-base sm:text-lg whitespace-pre-line">
                  {app}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Information Section */}
        <section className="py-8 sm:py-12 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10"
              style={{ fontFamily: "Cantata one, serif" }}
            >
              How to contact
            </h2>

            {/* Responsive grid for contact cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl  mx-auto">
              {/* Physical Location */}
              <div className="bg-[#ececec] p-4 sm:p-6 ">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Physical Location:
                </h3>
                <div className="text-[#111827] text-sm sm:text-base space-y-1">
                  <p>3D Printing Lab</p>
                  <p>Room No. WS 109D, Central Workshop</p>
                  <p>Indian Institute of Technology Indore,</p>
                  <p>Khandwa Road, Simrol, Indore – 453552</p>
                </div>
              </div>

              {/* Coordinator */}
              <div className="bg-[#ececec] p-4 sm:p-6 ">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Coordinator:
                </h3>
                <div className="text-[#111827] text-sm sm:text-base space-y-1">
                  <p className="font-medium">{instrument.handledBy}</p>
                  <p>Head, Central Workshop</p>
                  <p className="mb-2">Indian Institute of Technology Indore</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Tel: (91)-11-26591949</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={`mailto:${instrument.email}`}
                      className="text-xs sm:text-sm break-all hover:underline"
                    >
                      Email: {instrument.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Lab Staff */}
              <div className="bg-[#ececec] p-4 sm:p-6 ">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Lab Staff:
                </h3>
                <div className="text-[#111827] text-sm sm:text-base space-y-1">
                  <p className="font-medium">
                    {instrument.handledBy} –{" "}
                    <span className="font-normal">Project Attendant</span>
                  </p>
                  <p>Room No. 614B, POD A</p>
                  <p className="mb-2">Indian Institute of Technology Indore</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Tel: 011-2659-6702</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={`mailto:${instrument.email}`}
                      className="text-xs sm:text-sm break-all hover:underline"
                    >
                      Email: {instrument.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InstrumentDetail;