import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Banknote,
  Building2,
  ExternalLink,
  Info,
  Mail,
  Phone,
  Users,
  Download,
} from "lucide-react";
import {
  sampleAnalysisInfo,
} from "../data/instrumentsData";

const chargesData = [
  { isCategory: true, name: "1. NMR Spectroscopy", ids: ["nmr-500", "nmr-400"] },
  { isSubCategory: true, name: "Data in the format of raw file (FID)" },
  { name: "Proton NMR", academic: "200₹", industry: "500₹" },
  { name: "13C & other X-Nuclei & 2D NMR (For first hour of data collection)", academic: "300₹", industry: "700₹" },
  { isSubCategory: true, name: "Report in PDF format" },
  { name: "Proton NMR", academic: "500₹", industry: "800₹" },
  { name: "13C & other X-Nuclei & 2D NMR (For first hour of data collection)", academic: "1000₹", industry: "1200₹" },
  { name: "For subsequent hours", academic: "200₹", industry: "500₹" },
  { name: "Temperature variability range 25°C to 120°C For high temperature data collection (extra charges)", academic: "500₹", industry: "2000₹" },
  { name: "Temperature variability range 25°C to -70°C For Low temperature (Liquid Nitrogen) charges", academic: "500₹", industry: "2000₹" },
  { name: "Structure Elucidation (Detailed report of Peak Assignment based on structure will be given)", academic: "2500₹", industry: "5000₹" },
  { isSubCategory: true, name: "Solvent charges extra at actual cost" },
  { name: "D₂O / CDCl₃ / DMSO-d₆ / MeOD / CD₃COCD₃", academic: "200₹", industry: "200₹" },
  { name: "All other solvents", academic: "300₹", industry: "300₹" },
  
  { isCategory: true, name: "2. Chromatography" },
  { name: "LC-HRMS", academic: "1000₹", industry: "2000₹", ids: ["lc-hrms"] },
  { name: "GC-MS", academic: "2000₹", industry: "5000₹", ids: ["gc-ms"] },
  { name: "HPLC", academic: "1000₹", industry: "1500₹", ids: ["hplc"] },
  
  { isCategory: true, name: "3. Thermal Analysis" },
  { name: "Thermo Gravimetric Analysis (TGA)", academic: "1000₹", industry: "2000₹", ids: ["tga"] },
  { name: "Differential Scanning Calorimetery (DSC)", academic: "3000₹", industry: "5000₹", ids: ["dsc"] },
  
  { isCategory: true, name: "4. Elemental Analysis (CHNS-O)", ids: ["chns-o"] },
  { name: "C,H,N,S Analysis", academic: "1000₹", industry: "2000₹" },
  
  { isCategory: true, name: "5. BET Surface Area Analyzer", ids: ["bet"] },
  { isSubCategory: true, name: "Physisorption/Chemisoprtion" },
  { name: "Measurement based on N₂ Gas", academic: "5000₹", industry: "10,000₹" },
  { name: "Measurement based on CO₂ gas", academic: "8000₹", industry: "16,000₹" },
  
  { isCategory: true, name: "6. Spectroscopy" },
  { name: "FT-IR", academic: "500₹", industry: "1000₹", ids: ["ft-ir", "ft-ir-coe"] },
  { name: "UV-Visible", academic: "500₹", industry: "1000₹", ids: ["uv-vis"] },
  { name: "UV-Vis-NIR", academic: "500₹", industry: "1000₹", ids: ["uv-vis-nir"] },
  { name: "Fluorescence", academic: "500₹", industry: "1000₹", ids: ["fluorescence"] },
  { name: "Circular Dichroism (CD)", academic: "1000₹", industry: "2000₹", ids: ["cd"] },
  
  { isCategory: true, name: "7. Atomic Force Microscopy/ Scanning Probe Microscopy (AFM/SPM)", ids: ["afm"] },
  { isSubCategory: true, name: "Measuring modes (Processed image up to the publication level will be provided)" },
  { name: "Semi-Contact & Contact Mode", academic: "1000₹", industry: "2000₹" },
  { name: "Conductive", academic: "5000₹", industry: "15000₹" },
  { name: "Magnetic Force Microscopy (MFM)", academic: "5000₹", industry: "15000₹" },
  { name: "Kelvin Probe (Surface Potential Microscopy)", academic: "5000₹", industry: "15000₹" },
  { name: "Electric Force Microscopy (EFM)", academic: "5000₹", industry: "15000₹" },
  { name: "Scanning Tunneling Microscopy (STM)", academic: "5000₹", industry: "15000₹" },
  
  { isCategory: true, name: "8. Field Emission - Scanning Electron Microscope (FE-SEM)", ids: ["supra-55", "gemini-360"] },
  { isSubCategory: true, name: "(Per sample for first hour of recording)" },
  { name: "FE-SEM", academic: "1000₹", industry: "2000₹" },
  { name: "EDS/EDX", academic: "2000₹", industry: "3500₹" },
  { name: "BSE/BSD", academic: "2000₹", industry: "4000₹" },
  { name: "aSTEM", academic: "2500₹", industry: "10,000₹" },
  
  { isCategory: true, name: "9. Confocal Laser Scanning Microscope (CLSM)", ids: ["clsm"] },
  { isSubCategory: true, name: "Operations (Per Sample)" },
  { name: "Confocal Imaging", academic: "1000₹", industry: "1500₹" },
  { name: "FLIM/FCS", academic: "1000₹", industry: "3000₹" },
  { name: "Live Cell Imaging", academic: "4000₹", industry: "10,000₹" },
  { name: "Multiphoton Imaging", academic: "1500₹", industry: "3000₹" },
  
  { isCategory: true, name: "10. Other Equipments" },
  { name: "Polarimeter", academic: "500₹", industry: "1000₹", ids: ["polarimeter"] },
  { name: "Lyophilizer", academic: "750₹", industry: "1500₹", ids: ["lyophilizer-labconco", "lyophilizer-virtis"] },
  { name: "Rheometer", academic: "500₹", industry: "1000₹", ids: ["rheometer"] },
  
  { isCategory: true, name: "11. Microwave Reactor" },
  { name: "Per hour", academic: "200₹", industry: "1000₹" },
  
  { isCategory: true, name: "12. Liquid Nitrogen (LN₂)" },
  { name: "Per Litre at a time Maximum of 400 Litre will be delivered", academic: "70₹", industry: "100₹" },
  { isSubCategory: true, name: "For \"Liquid Nitrogen\" Transportation to be arranged by the user themselves." },
  
  { isCategory: true, name: "13. Millipore Test System" },
  { isSubCategory: true, name: "Millipore Test System" },
  { name: "Only Gravimetric Analysis or Particle count measurement", academic: "1000₹", industry: "4000₹" },
  { name: "Both Gravimetric Analysis and Particle count measurement", academic: "1500₹", industry: "6000₹" },
  
  { isCategory: true, name: "14. ICP-OES Spectroscopy" },
  { name: "Standardisation and Estimation", academic: "500₹", industry: "2000₹" },
  { name: "Estimation for Subsequent", academic: "180₹", industry: "500₹" },
  { name: "Sample Preparation", academic: "1200₹", industry: "4500₹" },
  { name: "Qualitative Scan", academic: "2000₹", industry: "7000₹" },
  
  { isCategory: true, name: "15. Transmission Electron Microscope (TEM)", ids: ["tem-talos-f200x"] },
  { isSubCategory: true, name: "TEM imaging/analysis charges (without GST) - Per analysis or per sample (Max duration: 1 hour)" },
  { name: "TEM + SAED", academic: "3000₹ (Internal: 600₹)", industry: "Ind: 9000₹ / Nat Labs: 6000₹" },
  { name: "TEM+ EDS (Spectrum)", academic: "3200₹ (Internal: 700₹)", industry: "Ind: 10500₹ / Nat Labs: 7000₹" },
  { name: "TEM + HRTEM", academic: "3500₹ (Internal: 700₹)", industry: "Ind: 10500₹ / Nat Labs: 7000₹" },
  { name: "TEM + HRTEM + EDS (spectrum)", academic: "3700₹ (Internal: 700₹)", industry: "Ind: 10500₹ / Nat Labs: 7000₹" },
  { name: "STEM (HAADF imaging)", academic: "4000₹ (Internal: 700₹)", industry: "Ind: 12000₹ / Nat Labs: 8000₹" },
  { name: "STEM (HAADF imaging) + EDS (Spectrum)", academic: "4200₹ (Internal: 800₹)", industry: "Ind: 12600₹ / Nat Labs: 8400₹" },
  { name: "STEM (HAADF imaging) + EDS (Mapping)", academic: "4500₹ (Internal: 800₹)", industry: "Ind: 13500₹ / Nat Labs: 9000₹" },
  { isSubCategory: true, name: "TEM Sample Preparation charges (without GST)" },
  { name: "Ion-Milling (PIPS) [Per Sample (Max duration: 3 hours)]", academic: "2000₹ (Internal: 600₹)", industry: "Ind: 6000₹ / Nat Labs: 4000₹" },
  { name: "Dimple Grinder [Per Sample (Max duration: 3 hours)]", academic: "400₹ (Internal: 100₹)", industry: "Ind: 1200₹ / Nat Labs: 800₹" },
  { name: "Low Speed Diamond Saw [Per Hour] (*Internal users should use their own diamond saw)", academic: "100₹ (Internal: 50₹*)", industry: "Ind: 400₹ / Nat Labs: 200₹" },
  { name: "Disc Grinder [Per sample (Max duration: 3 hours)]", academic: "200₹ (Internal: 50₹)", industry: "Ind: 600₹ / Nat Labs: 400₹" },
  { name: "Disc Punch [Up to 5 samples]", academic: "100₹ (Internal: 50₹)", industry: "Ind: 400₹ / Nat Labs: 200₹" },
  { name: "Carbon Membrane Cu Grid [Per Grid]", academic: "500₹ (Internal: 500₹)", industry: "Ind: 500₹ / Nat Labs: 500₹" },
  { name: "Powder TEM specimen (Non-Magnetic): Sonication + Drop cast on Cu Grid + Dry [Per Sample] (Grid price is not included)", academic: "1000₹ (Internal: 200₹)", industry: "Ind: 3000₹ / Nat Labs: 2000₹" },
  
  { isSubCategory: true, name: "GST extra at 18% on total cost" }
];

const SampleAnalysisCharges = () => {
  const location = useLocation();
  const [highlightedId, setHighlightedId] = useState(null);

  // Read ?id= query param and trigger highlight + scroll
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const instrumentId = params.get("id");

    if (instrumentId) {
      setHighlightedId(instrumentId);
    }
  }, [location]);

  // Scroll to the highlighted row once it's rendered
  useEffect(() => {
    if (highlightedId) {
      const timeout = setTimeout(() => {
        const matchedIndex = chargesData.findIndex(
          (row) => row.ids && row.ids.includes(highlightedId)
        );
        if (matchedIndex !== -1) {
          const element = document.getElementById(`row-${matchedIndex}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }, 300);

      const clearTimeout_ = setTimeout(() => {
        setHighlightedId(null);
      }, 5000);

      return () => {
        clearTimeout(timeout);
        clearTimeout(clearTimeout_);
      };
    }
  }, [highlightedId]);

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <style>{`
        @keyframes sacRowBlink {
          0%, 100% { background-color: #fef9c3; }
          50% { background-color: #fde68a; }
        }
        .sac-highlight-blink {
          animation: sacRowBlink 0.8s ease-in-out 4;
          background-color: #fef9c3;
        }
      `}</style>
      <section className="relative overflow-hidden px-4 py-14 text-white sm:px-8 lg:px-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80')",
        }}
        >
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
        <div className="absolute left-8 top-8 h-36 w-36 rounded-full bg-teal-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <h1
              className="text-4xl font-bold leading-tight sm:text-5xl"
              style={{ fontFamily: "Cantata one, serif" }}
            >
              Sample Analysis Charges
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
              Find instrument-wise charges, billing notes, SIC contact details,
              and bank-transfer information for external sample analysis.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://sicbooking.iiti.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-slate-950"
              >
                Book Sample Slot
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="/documents/SIC-Fee-Structure-15-July-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-slate-950"
              >
                Download PDF
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <h2 className="mb-5 text-2xl font-bold">Quick Contact</h2>
            <div className="space-y-4 text-blue-50">
              <p className="font-semibold text-white">
                {sampleAnalysisInfo.contact.title}
              </p>
              <p>{sampleAnalysisInfo.contact.institute}</p>
              <p>{sampleAnalysisInfo.contact.address}</p>
              <a
                href={`mailto:${sampleAnalysisInfo.contact.email}`}
                className="flex items-center gap-3 hover:text-teal-200"
              >
                <Mail className="h-5 w-5 text-teal-200" />
                {sampleAnalysisInfo.contact.email}
              </a>
              <a
                href={`tel:${sampleAnalysisInfo.contact.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-3 hover:text-teal-200"
              >
                <Phone className="h-5 w-5 text-teal-200" />
                {sampleAnalysisInfo.contact.phone}
              </a>
              <p className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-teal-200" />
                SIC Lab: {sampleAnalysisInfo.contact.labPhone}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-16">
        <div className="rounded-3xl bg-white p-5 shadow-xl sm:p-7">
          <div className="mb-6 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-slate-950 text-center sm:text-left">
              Instrument Charges
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[850px] text-left border-collapse border border-slate-300">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th rowSpan="2" className="px-5 py-4 text-center font-bold uppercase tracking-wide border border-slate-700 w-1/2 align-middle">
                    Instruments
                  </th>
                  <th colSpan="2" className="px-5 py-3 text-center font-bold uppercase tracking-wide border border-slate-700">
                    Analysis Charges for External Users
                  </th>
                </tr>
                <tr>
                  <th className="px-5 py-3 text-center text-sm font-bold uppercase tracking-wide border border-slate-700 w-1/4">
                    Academic Institution
                  </th>
                  <th className="px-5 py-3 text-center text-sm font-bold uppercase tracking-wide border border-slate-700 w-1/4">
                    Industries User/ National labs
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 bg-white text-slate-800 font-bold ">
                {chargesData.map((row, index) => {
                  const isHighlighted = row.ids && row.ids.includes(highlightedId);
                  const highlightClass = isHighlighted ? "sac-highlight-blink" : "";

                  if (row.isCategory) {
                    return (
                      <tr key={index} id={`row-${index}`} className={`bg-slate-100 font-bold text-center ${highlightClass} transition-all duration-300`}>
                        <td colSpan="3" className="px-5 py-3 border border-slate-300">{row.name}</td>
                      </tr>
                    );
                  }
                  if (row.isSubCategory) {
                    return (
                      <tr key={index} id={`row-${index}`} className={`bg-slate-50 italic text-slate-600 ${highlightClass} transition-all duration-300`}>
                        <td colSpan="3" className="px-5 py-2 border border-slate-300">{row.name}</td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={index} id={`row-${index}`} className={`hover:bg-slate-50 transition-all duration-300 ${highlightClass}`}>
                      <td className="px-5 py-3 border border-slate-300">{row.name}</td>
                      <td className="px-5 py-3 border border-slate-300 font-medium text-emerald-700">{row.academic}</td>
                      <td className="px-5 py-3 border border-slate-300 font-medium text-orange-700">{row.industry}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-8 lg:px-16">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <Users className="mb-4 h-9 w-9 text-blue-700" />
            <h3 className="text-xl font-bold text-slate-900">
              Academic Charges
            </h3>
            <p className="mt-2 text-slate-600">
              Applicable to academic institutions when the required cover letter
              or valid institutional ID is submitted.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <Building2 className="mb-4 h-9 w-9 text-orange-600" />
            <h3 className="text-xl font-bold text-slate-900">
              Industrial / National Lab Charges
            </h3>
            <p className="mt-2 text-slate-600">
              Applicable to company and industry users for analysis requested
              through SIC sample services.
            </p>
          </div>
          <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
            <Banknote className="mb-4 h-9 w-9 text-teal-700" />
            <h3 className="text-xl font-bold text-slate-900">
              Advance Payment
            </h3>
            <p className="mt-2 text-slate-600">
             All payments must be made in advance. All listed costs are per sample and exclusive of GST at 18%
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-16">
        <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-lg">
          <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-slate-950">
            <Info className="h-7 w-7 text-blue-700" />
            Submission & Billing Notes
          </h2>

          <ol className="space-y-3">
            {sampleAnalysisInfo.submissionSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-slate-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-7 rounded-2xl bg-blue-50 p-5">
            <p className="font-bold text-blue-950">Bill Settlement</p>
            <p className="mt-2 text-slate-700">
              GSTIN: {sampleAnalysisInfo.billing.gstin}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              {sampleAnalysisInfo.billing.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {sampleAnalysisInfo.resources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 font-bold text-blue-800 transition hover:border-blue-700 hover:bg-blue-50"
              >
                {resource.label}
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-teal-100 bg-white p-7 shadow-lg">
          <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-slate-950">
            <Banknote className="h-7 w-7 text-teal-700" />
            Account / Payment Transfer Details
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {sampleAnalysisInfo.accountDetails.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1 break-words font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SampleAnalysisCharges;