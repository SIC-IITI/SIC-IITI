import React from 'react';
import { ChevronRight } from 'lucide-react';

function Instruments() {
  const categories = [
    {
      name: "X-Ray Techniques",
      icon: "🔍",
      instruments: [
        { name: "Single Crystal XRD (SCXRD)", desc: "Crystal structure determination and refinement." },
        { name: "Energy Dispersive X-Ray Spectroscopy (EDS/EDX)", desc: "Elemental composition analysis and mapping." },
        { name: "Backscattered Electron Detector (BSE/BSD)", desc: "High contrast imaging for phase analysis." },
      ]
    },
    {
      name: "Microscopy",
      icon: "🔬",
      instruments: [
        { name: "Scanning Electron Microscope (FE-SEM)", desc: "High-resolution surface imaging and analysis." },
        { name: "Confocal Laser Scanning Microscope (CLSM)", desc: "3D optical imaging with fluorescence detection." },
        { name: "Atomic Force Microscope (AFM)", desc: "Topographical mapping at the nanoscale." },
        { name: "Single Molecule Microscope (TIRFM)", desc: "Total internal reflection fluorescence microscopy." },
      ]
    },
    {
      name: "Spectroscopy",
      icon: "📊",
      instruments: [
        { name: "Nuclear Magnetic Resonance (NMR)", desc: "Molecular structure and dynamics analysis." },
        { name: "Fourier Transform Infrared Spectrometer (FT-IR)", desc: "Functional group identification and molecular structure." },
        { name: "Circular Dichroism (CD)", desc: "Protein secondary structure and chiral analysis." },
        { name: "UV-Visible Spectrometer (UV-VIS)", desc: "Optical absorption and transmission measurements." },
        { name: "UV-Visible Spectrometer (NIR)", desc: "Near-infrared spectroscopy for material analysis." },
        { name: "Spectro Fluorometer (SF)", desc: "Fluorescence and phosphorescence measurements." },
      ]
    },
    {
      name: "Chromatography",
      icon: "⚗️",
      instruments: [
        { name: "Mass Spectrometry (MS)", desc: "Molecular weight determination and mass analysis." },
        { name: "High Resolution Mass Spectrometry (HRMS)", desc: "Accurate mass determination for elemental composition." },
        { name: "Liquid Chromatography Mass Spectrometry (LCMS)", desc: "Separation and identification of complex mixtures." },
        { name: "High Performance Liquid Chromatography (RP-HPLC)", desc: "Quantitative and qualitative analysis of samples." },
        { name: "Gas Chromatography-Mass Spectrometry (GCMS)", desc: "Volatile compound analysis and identification." },
      ]
    },
  ];

  return (
    <section className="space-y-8 px-4 py-12 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Our Instruments</h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          The center hosts a comprehensive range of advanced instruments across multiple analytical categories. Contact facility staff for detailed specifications, training requirements, and booking availability.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category.name}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{category.icon}</span>
            <h2 className="text-2xl font-bold text-blue-900">{category.name}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {category.instruments.map((inst) => (
              <div key={inst.name} className="rounded-lg border border-blue-200 bg-white p-6 hover:shadow-lg hover:border-blue-400 transition-all">
                <h3 className="text-lg font-bold text-blue-900">{inst.name}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{inst.desc}</p>
                <button className="mt-4 text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2">
                  Request Access <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Instruments;
