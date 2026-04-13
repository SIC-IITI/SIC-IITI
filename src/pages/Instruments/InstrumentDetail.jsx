import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mail, Beaker, Calendar, FileText, Phone, CheckCircle, Wrench, AlertTriangle } from "lucide-react";
import instrumentsData from "../../data/instrumentsData";

import {
  getImagesFromInstrument,
  getFallbackImages,
} from "../../utils/imageloader";

const getInstrumentStatusDetails = (statusString) => {
  if (statusString === "Not Working") {
    return {
      label: "Not Working",
      color: "text-red-700",
      bg: "bg-red-100",
      border: "border-red-200",
      icon: AlertTriangle,
    };
  }
  if (statusString === "Under Maintenance") {
    return {
      label: "Under Maintenance",
      color: "text-orange-700",
      bg: "bg-orange-100",
      border: "border-orange-200",
      icon: Wrench,
    };
  }
  return {
    label: "Operational",
    color: "text-green-700",
    bg: "bg-green-100",
    border: "border-green-200",
    icon: CheckCircle,
  };
};

const InstrumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  // Scroll to top when the component mounts or the id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
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

  const statusInfo = getInstrumentStatusDetails(instrument.status || "Operational");
  const StatusIcon = statusInfo.icon;
  // const allImages = instruments.flatMap(inst => inst.images || []);
  // const fallbackImage =
  //   allImages[Math.floor(Math.random() * allImages.length)] || "/sic.png";
  const fallbackImage = "/assets/slider/clsm.jpeg";
  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      {/* Hero Header */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="mb-1 sm:mb-4">
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
        <div className="mb-1">
          <p className="text-black text-base sm:text-lg md:text-xl">
            {instrument.model}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-black mb-6 sm:mb-8">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/10 rounded-full font-semibold text-sm sm:text-base">
            {instrument.category.replace("-", " ")}
          </span>
          <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base flex items-center gap-2 border ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`}>
            <StatusIcon className="w-4 h-4" />
            {statusInfo.label}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Image Slideshow Section */}
        <div className="mb-8 sm:mb-12 px-4 sm:px-6 lg:px-20 flex justify-center">
          {/* Adjusted to be nicely sized but not overwhelming */}
          <div className="relative w-full max-w-4xl h-64 sm:h-80 md:h-[400px] lg:h-[500px] overflow-hidden">
            {images.length > 0 ? (
              <>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${instrument.name} view ${index + 1}`}

                    className={`absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-opacity duration-1000 p-2 sm:p-4 ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    onError={(e) => {
                      console.error(`Failed to load image: ${image}`);
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = fallbackImage;
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

        <div className="flex flex-wrap gap-3 px-4 sm:px-6 lg:px-20 mb-2">
          <button
            onClick={() => navigate(`/booking`)}
            className="flex items-center gap-2 px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-all shadow-md active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </button>
          <button
            onClick={() => navigate(`/usage-charges?id=${instrument.id}`)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-gray-200 hover:border-teal-500 hover:text-teal-600 text-gray-700 font-bold rounded-lg transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            View Charges
          </button>
          <button
            onClick={() => window.open("https://sicbooking.iiti.ac.in/", "_blank")}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-gray-200 hover:border-teal-500 hover:text-teal-600 text-gray-700 font-bold rounded-lg transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            Sample Requirement
          </button>
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
                <li
                  key={index}
                  className="text-base sm:text-lg whitespace-pre-line"
                >
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
                <li
                  key={index}
                  className="text-base sm:text-lg whitespace-pre-line"
                >
                  {app}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Section */}
        <div className="w-full">
          <section className="py-12 mx-auto px-4 sm:px-16 lg:px-8 justify-center bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2
                className="text-3xl font-bold text-center mb-10"
                style={{ fontFamily: "Cantata one, serif" }}
              >
                How to Contact
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {/* Physical Location */}
                <div className="bg-[#ececec] p-6 flex flex-col justify-start">
                  <h3 className="text-2xl font-bold mb-3">Physical Location</h3>
                  <div className="text-[#111827] ">
                    {instrument.location}
                    <p>SIC Building</p>
                    <p>Indian Institute of Technology Indore</p>
                    <p>Khandwa Road, Simrol, Indore – 453552</p>
                  </div>
                </div>

                {/* Coordinator */}
                <div className="bg-[#ececec] p-6 flex flex-col justify-between">
                  <h3 className="text-2xl font-bold mb-3">Facility Manager</h3>
                  <div className="space-y-1">
                    <p className="font-medium">{instrument.handledBy}</p>
                    <p>
                      {instrument.position ? instrument.position : "Technical Superintendent, SIC"}
                    </p>
                    <p>Indian Institute of Technology Indore</p>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a
                        href={`mailto:${instrument.email}`}
                        className="text-sm hover:underline"
                      >
                        {instrument.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;