// src/pages/Instruments.jsx
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import instrumentsData from "../../data/instrumentsData";

const InstrumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Group instruments by category
  const groupedInstruments = useMemo(() => {
    const filtered = instrumentsData.filter(
      (instrument) =>
        instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instrument.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instrument.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const grouped = {};
    filtered.forEach((instrument) => {
      if (!grouped[instrument.category]) {
        grouped[instrument.category] = [];
      }
      grouped[instrument.category].push(instrument);
    });

    return grouped;
  }, [searchQuery]);

  const handleInstrumentClick = (instrumentId) => {
    navigate(`/instruments/${instrumentId}`);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#D9D9D9" }}>
      {/* Hero Section */}
      <div
        className="relative h-[380px] sm:h-[450px] md:h-[500px] bg-cover bg-center"
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

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide"
            style={{ fontFamily: "Cantata one" }}
          >
            Research Instruments
          </h1>
          <p
            className="text-base sm:text-lg md:text-2xl text-gray-200 mb-10 sm:mb-12 max-w-4xl"
            style={{ fontFamily: "Cantata one" }}
          >
            State-of-the-art laboratory and research equipment for scientific
            excellence
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-wrap gap-4 sm:gap-8 md:gap-16 justify-center w-full max-w-4xl"
            style={{ fontFamily: "Cantata one" }}
          >
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 w-full sm:w-auto">
              View Appointment Slot
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 w-full sm:w-auto">
              View Facility Status
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 w-full sm:w-auto">
              Book Your Instrument
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div
        className="bg-gray-100 py-8 sm:py-12"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <div className="max-w-xl md:max-w-4xl mx-auto px-10 sm:px-6">
          <div className="relative flex items-stretch bg-white rounded-md shadow-sm overflow-hidden border-2 border-gray-900">
            {/* Input Field */}
            <Search className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 w-full pl-4 sm:pl-12 pr-4 py-3 sm:py-4 font-bold rounded-md text-base sm:text-xl focus:outline-none text-gray-700 placeholder-gray-400 bg-white sm:placeholder:before:content-['Search_your_Instruments']"
            />

            {/* Desktop Submit Button */}
            <button
              onClick={handleSearch}
              className="hidden sm:block px-8 md:px-12 py-3 m-1 sm:py-4 md:bg-teal-400 md:hover:bg-teal-500 sm:text-xl text-white border-1 border-gray-700 font-bold rounded-md transition-colors duration-300"
            >
              Submit
            </button>

            {/* Mobile Search Icon Button */}
            <button
              onClick={handleSearch}
              className="sm:hidden px-4 py-3 bg-teal-400 hover:bg-teal-500 flex items-center justify-center border-0"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      {/* Instruments by Category */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        {Object.keys(groupedInstruments).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl sm:text-2xl text-gray-500">
              No instruments found matching your search.
            </p>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {Object.entries(groupedInstruments).map(
              ([category, instruments]) => (
                <div key={category}>
                  {/* Category Heading */}
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b-4 border-blue-600"
                    style={{ fontFamily: "Cantata one" }}
                  >
                    {category}
                  </h2>

                  {/* Instruments Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {instruments.map((instrument) => (
                      <div
                        key={instrument.id}
                        onClick={() => handleInstrumentClick(instrument.id)}
                        className="bg-white border border-gray-500 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      >
                        {/* Instrument Info */}
                        <div className="p-4 sm:p-6 text-center">
                          <h3
                            className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors"
                            style={{ fontFamily: "Cantata one" }}
                          >
                            {instrument.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentsPage;
