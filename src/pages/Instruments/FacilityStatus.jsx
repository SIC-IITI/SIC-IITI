
import React, { useState } from "react";
import { CheckCircle, Wrench, AlertTriangle, X, Beaker } from "lucide-react";
import instrumentsData, { categoryDescriptions } from "../../data/instrumentsData";

export default function FacilityStatus() {
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  // Status logic
  const getInstrumentStatusDetails = (statusString) => {
    if (statusString === "Not Working") {
      return {
        label: "Not Working",
        color: "text-red-700",
        bg: "bg-red-100",
        border: "border-red-200",
        icon: AlertTriangle,
        message: "Currently out of order. Awaiting spare parts.",
      };
    }
    if (statusString === "Under Maintenance") {
      return {
        label: "Under Maintenance",
        color: "text-orange-700",
        bg: "bg-orange-100",
        border: "border-orange-200",
        icon: Wrench,
        message: "Scheduled maintenance in progress.",
      };
    }
    return {
      label: "Operational",
      color: "text-green-700",
      bg: "bg-green-100",
      border: "border-green-200",
      icon: CheckCircle,
      message: "Instrument is working perfectly.",
    };
  };

  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length <= limit ? text : text.slice(0, limit) + "...";
  };

  // ✅ GROUPING LOGIC
  const groupedInstruments = instrumentsData
    .filter((item) => item.showInStatus !== false)
    .reduce((acc, instrument) => {
      if (!acc[instrument.category]) {
        acc[instrument.category] = [];
      }
      acc[instrument.category].push(instrument);
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "Cantata one" }}>
            Facility Status
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Check the real-time operational status of all instruments.
          </p>
        </div>
      </section>

      {/* ✅ CATEGORY-WISE RENDERING */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">

          {Object.entries(groupedInstruments)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, instruments]) => (
              <div key={category} className="mb-12">

                {/* Category Heading */}
                <h2
                  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
                  style={{ fontFamily: "Cantata one" }}
                >
                  {category}
                </h2>

                {/* Category Description */}
                {categoryDescriptions[category] && (
                  <p className="text-gray-500 mb-6 text-sm">
                    {categoryDescriptions[category]}
                  </p>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {instruments.map((instrument) => {
                    const status = getInstrumentStatusDetails(
                      instrument.status || "Operational"
                    );
                    const StatusIcon = status.icon;

                    const imageUrl =
                      instrument.images?.[0] ||
                      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80";

                    return (
                      <div
                        key={instrument.id}
                        className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                        onClick={() =>
                          setSelectedInstrument({ ...instrument, status })
                        }
                      >
                        {/* Image */}
                        <div className="relative h-48 bg-gray-100 p-4 flex items-center justify-center">
                          <img
                            src={imageUrl}
                            alt={instrument.name}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition"
                          />

                          {/* Status Badge */}
                          <div
                            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${status.bg} ${status.color} ${status.border}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {instrument.name}
                          </h3>

                          <p className="text-sm text-gray-500 mb-4 flex-grow">
                            {truncateText(instrument.fullName, 60)}
                          </p>

                          <button className="text-sm text-blue-600 hover:underline">
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </section>


       {/* Modal */}
      {selectedInstrument && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b p-5 bg-gray-50 rounded-t-xl">
              <div className="flex items-center gap-3">
                <Beaker className="w-6 h-6 text-blue-600" />
                <h2
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: "Cantata one" }}
                >
                  {selectedInstrument.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInstrument(null)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div
                className={`flex items-center gap-3 p-4 rounded-lg mb-6 border ${selectedInstrument.status.bg} ${selectedInstrument.status.border} ${selectedInstrument.status.color}`}
              >
                <selectedInstrument.status.icon className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-base">
                    Status: {selectedInstrument.status.label}
                  </h4>
                  <p className="text-sm mt-0.5 opacity-90">
                    {selectedInstrument.status.message}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900">Full Name</h4>
                  <p>{selectedInstrument.fullName}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Model</h4>
                  <p>{selectedInstrument.model}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Category</h4>
                  <p className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm mt-1">
                    {selectedInstrument.category}
                  </p>
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                  <p className="text-sm">
                    <strong>Handled By:</strong> {selectedInstrument.handledBy}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${selectedInstrument.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedInstrument.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t p-5 bg-gray-50 rounded-b-xl flex justify-end">
              <button
                onClick={() => setSelectedInstrument(null)}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}