// src/pages/InstrumentDetail.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, FileText, Beaker, ChevronDown, ChevronUp } from "lucide-react";
import instrumentsData from "../../data/data";

const InstrumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedApp, setExpandedApp] = useState(null);

  // Find the instrument by ID
  const instrument = instrumentsData.find((item) => item.id === id);

  // Parse applications to extract numbered sections
  const parseApplications = (applications) => {
    if (!applications || applications.length === 0) return [];

    const parsed = [];
    applications.forEach((app) => {
      // Split by numbered sections (e.g., "1.", "2.", etc.)
      const sections = app.split(/(?=\d+\.\s+[A-Z])/);
      sections.forEach((section) => {
        if (section.trim()) {
          const lines = section.split('\n').filter(line => line.trim());
          if (lines.length > 0) {
            const title = lines[0].trim();
            const content = lines.slice(1).join('\n').trim();
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#D9D9D9" }}>
        <div className="text-center">
          <div className="mb-6">
            <Beaker className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Instrument Not Found</h2>
          <p className="text-gray-600 mb-6">The instrument you're looking for doesn't exist.</p>
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
      <div className="relative bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-900 py-12 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
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
        {/* Model Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-200 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h2
              className="text-3xl font-bold text-blue-600"
              style={{ fontFamily: "Cantata one" }}
            >
              Model Information
            </h2>
          </div>
          <p className="text-xl text-gray-800 leading-relaxed">{instrument.model}</p>
        </div>

        {/* Features Section - Full Width */}
        {instrument.features && instrument.features.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 mb-8">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
              <h2
                className="text-2xl font-bold text-white flex items-center gap-3"
                style={{ fontFamily: "Cantata one" }}
              >
                <span className="text-3xl">✨</span>
                Features
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {instrument.features.map((feature, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-5 border-l-4 border-orange-500 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed flex-1 whitespace-pre-line">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applications Section - Accordion Style */}
        {parsedApplications.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
              <h2
                className="text-2xl font-bold text-white flex items-center gap-3"
                style={{ fontFamily: "Cantata one" }}
              >
                <span className="text-3xl">🔬</span>
                Applications
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {parsedApplications.map((app, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 transition-colors">
                    <button
                      onClick={() => setExpandedApp(expandedApp === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="font-bold text-left text-gray-800">{app.title}</span>
                      </div>
                      {expandedApp === index ? (
                        <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      )}
                    </button>
                    {expandedApp === index && app.content && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{app.content}</p>
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
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
              <h2
                className="text-2xl font-bold text-white flex items-center gap-3"
                style={{ fontFamily: "Cantata one" }}
              >
                <span className="text-3xl">🔬</span>
                Applications
              </h2>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-500 italic">Application details will be added soon.</p>
            </div>
          </div>
        )}

        {/* Contact & Actions Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Card */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 border-l-4 border-red-600 hover:shadow-2xl transition-shadow">
            <h2
              className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-3"
              style={{ fontFamily: "Cantata one" }}
            >
              <span className="text-3xl">👤</span>
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-semibold">Handled By</p>
                <p className="text-xl font-bold text-gray-800">{instrument.handledBy}</p>
              </div>
              <div className="flex items-center gap-3 text-blue-600 bg-white p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors shadow-sm">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href={`mailto:${instrument.email}`}
                  className="hover:underline font-semibold break-all"
                >
                  {instrument.email}
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 flex flex-col justify-center hover:shadow-2xl transition-shadow">
            <h2
              className="text-2xl font-bold text-gray-800 mb-6 text-center"
              style={{ fontFamily: "Cantata one" }}
            >
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                style={{ fontFamily: "Cantata one" }}
              >
                <FileText className="w-5 h-5" />
                Form Submission
              </button>
              <button
                className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                style={{ fontFamily: "Cantata one" }}
              >
                <Beaker className="w-5 h-5" />
                Collect your Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;