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
    <div className="min-h-screen" style={{ backgroundColor: "#ffffffff" }}>
      {/* Hero Header */}



        <div className="relative max-w-7xl mx-auto px-4">


          <div className="flex items-center gap-3 mb-4">
            <h1
              className="text-4xl md:text-5xl font-bold text-black mt-10"
              style={{ fontFamily: "Cantata one" }}
            >
              {instrument.name} (
                <div className="text-3xl inline-block font-normal  text-black ">
               {instrument.fullName}
                </div>
              )
            </h1>
          </div>
          {/* Model Section */}

           <div className="    mb-3 ">
            <p className=" text-black text-xl "> {instrument.model}</p>
          </div>
          <div className="flex items-center text-black">
            <span className="px-4 py-2 bg-black/10  rounded-full  font-semibold ">
              {instrument.category}
            </span>
          </div>
        </div>


      {/* Main Content */}
      <div className="max-w-full  px-5 ">
        {/* Image Slideshow Section */}
        <div className=" mb-1">
          <div className="relative  w-96 h-96 px-10  md:h-[500px] lg:h-[600px] overflow-hidden">
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

        {/*About  Section */}
        {instrument.features && instrument.features.length > 0 && (
          <div className="mt-6 bg-white px-9 py-6 mb-8 ">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "Cantata one" }}
            >
              About the Instrument
            </h2>

            <ul className="list-disc pl-6 gap-y-1 text-gray-700">
              {instrument.features.map((feature, index) => (
                <li key={index} className="text-lg whitespace-pre-line">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Applications Section */}
        {instrument.applications && instrument.applications.length > 0 && (
          <div className=" mb-8 px-9">
            <h2
              className="text-3xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Cantata one" }}
            >
              Applications
            </h2>
            <ul className="list-disc pl-6 gap-y-1 text-gray-700">
              {instrument.applications.map((app, index) => (
                <li key={index} className="flex items-start p-1">
                  <p className="text-lg whitespace-pre-line">
                    {app}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Information Section */}
        <section className=" py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              className="text-3xl font-bold text-center mb-10"
              style={{ fontFamily: "Cantata one, serif" }}
            >
              How to contact
            </h2>

            {/* Container that centers three fixed-size cards */}
            <div className="flex justify-center gap-8 flex-wrap">
              {/* Physical Location */}
              <div
                className="bg-[#ececec] p-4"
                style={{ width: "380px", height: "190px" }}
              >
                <h3 className="text-2xl font-bold mb-3">Physical Location:</h3>

                <div
                  className="text-[#111827] leading-5"
                  style={{ lineHeight: 1.35 }}
                >
                  <p className="mb-1">3D Printing Lab</p>
                  <p className="mb-1">Room No. WS 109D, Central Workshop</p>
                  <p className="mb-1">Indian Institute of Technology Indore,</p>
                  <p className="">Khandwa Road, Simrol, Indore – 453552</p>
                </div>
              </div>

              {/*  Coordinator */}
              <div
                className="bg-[#ececec] p-4"
                style={{ width: "380px", height: "190px" }}
              >
                <h3 className="text-2xl font-bold mb-3">Coordinator:</h3>

                <div
                  className="text-[#111827]  leading-5"
                  style={{ lineHeight: 1.35 }}
                >
                  <p className="font-medium mb-1">Prof. Sunil Jha</p>
                  <p className="mb-1">Head, Central Workshop</p>
                  <p className="mb-2">Indian Institute of Technology Indore</p>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>Tel: (91)-11-26591949</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:suniljha@mech.iitd.ac.in">
                      Email: suniljha@mech.iitd.ac.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Lab Staff */}
              <div
                className="bg-[#ececec]  p-4"
                style={{ width: "380px", height: "190px" }}
              >
                <h3 className="text-2xl font-bold mb-3">Lab Staff:</h3>

                <div
                  className="text-[#111827]  leading-5"
                  style={{ lineHeight: 1.35 }}
                >
                  <p className="font-medium mb-1">
                    Mr. Tarun Singh –{" "}
                    <span className="font-normal">Project Attendant</span>
                  </p>
                  <p className="mb-1">Room No. 614B, POD A</p>
                  <p className="mb-2">Indian Institute of Technology Indore</p>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>Tel: 011-2659-6702</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:ird13728@crf.iitd.ac.in">
                      Email: ird13728@crf.iitd.ac.in
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
