
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
        className="relative h-[500px] bg-cover bg-center"
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
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1
            className="text-3xl md:text-4xl font-bold text-white text-center mb-4 tracking-wide"
            style={{ fontFamily: "Cantata one" }}
          >
            Research Instruments
          </h1>
          <p
            className="text-md md:text-2xl text-gray-200 text-center mb-12 max-w-4xl"
            style={{ fontFamily: "Cantata one" }}
          >
            State-of-the-art laboratory and research equipment for scientific
            excellence
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-wrap gap-16 justify-center"
            style={{ fontFamily: "Cantata one" }}
          >
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-gray-900 transition-all duration-300">
              View Appointment Slot
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-gray-900 transition-all duration-300">
              View Facility Status
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Book Your Instrument
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gray-100 py-12" style={{ backgroundColor: "#D9D9D9" }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
            <Search className="absolute left-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your Instruments"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 pl-12 pr-4 py-4 font-bold rounded-md text-xl focus:outline-none text-gray-700 placeholder-gray-400 bg-white"
            />
            <button
              onClick={handleSearch}
              className="px-10 py-3 m-1 bg-teal-400 hover:bg-teal-500 text-xl text-white font-bold rounded-md transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Instruments by Category */}
      <div
        className="max-w-7xl mx-auto px-4 py-16"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        {Object.keys(groupedInstruments).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500">
              No instruments found matching your search.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(groupedInstruments).map(([category, instruments]) => (
              <div key={category}>
                {/* Category Heading */}
                <h2
                  className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 pb-4 border-b-4 border-blue-600"
                  style={{ fontFamily: "Cantata one" }}
                >
                  {category}
                </h2>

                {/* Instruments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {instruments.map((instrument) => (
                    <div
                      key={instrument.id}
                      onClick={() => handleInstrumentClick(instrument.id)}
                      className="bg-white border border-gray-500 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    >
                      {/* Instrument Info */}
                      <div className="p-6 text-center">
                        <h3
                          className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors"
                          style={{ fontFamily: "Cantata one" }}
                        >
                          {instrument.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentsPage;