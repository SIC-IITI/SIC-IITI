import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { instrumentsData, getAllCategories } from "../data/instrumentsData";
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  Building2,
  Info,
} from "lucide-react";

function UsageCharges() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredByInstrument, setFilteredByInstrument] = useState(null);

  const categories = ["All", ...getAllCategories()];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const instrumentId = params.get("id");

    if (instrumentId) {
      const instrument = instrumentsData.find(
        (item) => item.id === instrumentId
      );
      if (instrument) {
        setFilteredByInstrument(instrument);
        setSearchTerm(instrument.name);
      }
    }
  }, [location]);

  const filteredInstruments = instrumentsData.filter((instrument) => {
    if (filteredByInstrument) {
      return (
        instrument.id === filteredByInstrument.id && instrument.usageCharges
      );
    }

    const matchesCategory =
      selectedCategory === "All" || instrument.category === selectedCategory;
    const matchesSearch =
      instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instrument.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && instrument.usageCharges;
  });

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    setFilteredByInstrument(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredByInstrument(null);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (filteredByInstrument) {
      setFilteredByInstrument(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <section className="space-y-8 px-4 py-12 max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-10 h-10 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Usage Charges
              </h1>
            </div>
            <p className="text-blue-100 leading-relaxed text-lg max-w-3xl">
              Standardized charges for sustainable operation. Rates may vary
              based on sample type, complexity, and specialized requirements.
              Contact us for detailed quotes.
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 overflow-visible">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Enhanced Search Bar */}
            <div className="flex-1">
              <div className="relative flex items-stretch bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors duration-300">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search instruments by name or description..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="flex-1 w-full pl-12 pr-4 py-4 text-base focus:outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                />
                <button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-semibold rounded-r-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Enhanced Category Filter */}
            <div className="lg:w-64 overflow-visible">
              <div className="relative overflow-visible bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-colors duration-300">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium shadow-sm hover:border-blue-400 transition-colors duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: "none",
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count with Icon */}
          <div className="mt-4 flex items-center gap-2 text-gray-600 font-medium">
            <Info className="w-5 h-5 text-blue-500" />
            <span>
              Showing{" "}
              <span className="font-bold text-blue-600">
                {filteredInstruments.length}
              </span>{" "}
              instrument{filteredInstruments.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Enhanced Charges Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="px-6 py-5 text-left font-bold text-sm uppercase tracking-wider">
                    Instrument
                  </th>
                  <th className="px-6 py-5 text-left font-bold text-sm uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-5 text-left font-bold text-sm uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-5 text-left font-bold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Internal Users
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left font-bold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      External Users
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInstruments.length > 0 ? (
                  filteredInstruments.map((instrument, idx) => (
                    <tr
                      key={instrument.id}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-blue-50/50"
                      } hover:bg-blue-100/50 transition-colors duration-200`}
                    >
                      <td className="px-6 py-5">
                        <div className="font-bold text-blue-900 text-lg">
                          {instrument.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {instrument.fullName}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-gray-700 font-medium">
                          {instrument.model}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-100 rounded-full border border-blue-200">
                          {instrument.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-green-700 font-bold text-lg">
                          {instrument.usageCharges.internal}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-orange-700 font-bold text-lg">
                          {instrument.usageCharges.external}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Search className="w-16 h-16 text-gray-300" />
                        <p className="text-gray-500 text-lg font-medium">
                          No instruments found matching your criteria.
                        </p>
                        <p className="text-gray-400 text-sm">
                          Try adjusting your search or filter settings.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Important Notes */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-5 flex items-center gap-3">
            <Info className="w-7 h-7 text-blue-600" />
            Important Notes
          </h3>
          <div className="grid md:grid-cols-1 gap-4">
            {[
              {
                icon: Users,
                text: "Internal users include students, faculty, and staff of IIT Indore",
              },
              {
                icon: Building2,
                text: "External users include academia, industries, and research institutions",
              },
              {
                icon: TrendingUp,
                text: "Discounts available for bulk bookings and long-term collaborations",
              },
              {
                icon: Info,
                text: "Sample preparation charges may apply separately",
              },
              {
                icon: Users,
                text: "For custom analysis requirements, contact the respective instrument handler",
              },
              {
                icon: TrendingUp,
                text: "Charges are subject to periodic revision based on operational costs",
              },
              {
                icon: Info,
                text: "Advanced booking is recommended to ensure equipment availability",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-blue-100"
              >
                <item.icon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 leading-relaxed">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-3">Need More Information?</h3>
            <p className="mb-6 text-blue-100 text-lg">
              For detailed quotes, specialized requirements, or bulk booking
              inquiries:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:sic@iiti.ac.in"
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl text-center transform hover:-translate-y-1 duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Email SIC
                </span>
              </a>
              <a
                href="/contact"
                className="group bg-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-400 transition-all shadow-lg hover:shadow-xl text-center border-2 border-blue-400 transform hover:-translate-y-1 duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Contact Us
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UsageCharges;
