import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import instrumentsData from "../data/instrumentsData";

function Instruments() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "X-Ray Techniques",
      icon: "🔍",
      instruments: ["scxrd", "edx", "bse"],
    },
    {
      name: "Microscopy",
      icon: "🔬",
      instruments: ["sem", "clsm", "afm", "tirfm"],
    },
    {
      name: "Spectroscopy",
      icon: "📊",
      instruments: ["nmr", "ftir", "cd", "uvvis", "nir", "sf"],
    },
    {
      name: "Chromatography",
      icon: "⚗️",
      instruments: ["ms", "hrms", "lcms", "hplc", "gcms"],
    },
  ];

  return (
    <section className="space-y-8 px-4 py-12 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Our Instruments
        </h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          Explore our advanced instruments across multiple analytical
          categories. Click an instrument to view its details and booking info.
        </p>
      </div>

      {/* Render each category */}
      {categories.map((category) => (
        <div key={category.name}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{category.icon}</span>
            <h2 className="text-2xl font-bold text-blue-900">
              {category.name}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {category.instruments.map((id) => {
              const inst = instrumentsData[id];
              if (!inst) return null;
              return (
                <div
                  key={inst.id}
                  onClick={() => navigate(`/instruments/${inst.id}`)}
                  className="rounded-lg border border-blue-200 bg-white p-6 hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-blue-900">
                    {inst.name}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {inst.applications?.[0] || inst.model}
                  </p>
                  <div className="mt-4 text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2">
                    View Details <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Instruments;
