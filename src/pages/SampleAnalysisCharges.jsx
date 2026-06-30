import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Banknote,
  Building2,
  ExternalLink,
  FileText,
  Info,
  Mail,
  Phone,
  Search,
  Users,
} from "lucide-react";
import {
  getAllCategories,
  instrumentsData,
  sampleAnalysisInfo,
} from "../data/instrumentsData";

const formatCharge = (charge = "") =>
  charge.replace(/^[^\d]+/, "Rs. ").replace(/\s+/g, " ").trim();

const SampleAnalysisCharges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => ["All", ...getAllCategories()], []);

  const chargeableInstruments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return instrumentsData.filter((instrument) => {
      if (!instrument.usageCharges) {
        return false;
      }

      const matchesCategory =
        selectedCategory === "All" || instrument.category === selectedCategory;
      const matchesSearch =
        !query ||
        instrument.name.toLowerCase().includes(query) ||
        instrument.fullName.toLowerCase().includes(query) ||
        instrument.model.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <section className="relative overflow-hidden px-4 py-14 text-white sm:px-8 lg:px-16"
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
              <Link
                to="/usage-charges"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-6 py-3 font-bold text-slate-950 shadow-lg transition hover:bg-teal-300"
              >
                <FileText className="h-5 w-5" />
                Open Usage Charges
              </Link>
              <a
                href="https://sicbooking.iiti.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-slate-950"
              >
                Book Sample Slot
                <ExternalLink className="h-4 w-4" />
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
              Industrial Charges
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
              All listed costs are per sample and exclusive of GST at{" "}
              {sampleAnalysisInfo.billing.gst}.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-8 lg:px-16">
        <div className="rounded-3xl bg-white p-5 shadow-xl sm:p-7">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">
                Instrument Charges
              </h2>
              <p className="mt-2 text-slate-600">
                Showing {chargeableInstruments.length} chargeable instrument
                {chargeableInstruments.length === 1 ? "" : "s"}.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search instrument..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-slate-700 outline-none transition focus:border-blue-500 sm:w-72"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 outline-none transition focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="px-5 py-4 text-sm font-bold uppercase tracking-wide">
                    Instrument
                  </th>
                  <th className="px-5 py-4 text-sm font-bold uppercase tracking-wide">
                    Model
                  </th>
                  <th className="px-5 py-4 text-sm font-bold uppercase tracking-wide">
                    Category
                  </th>
                  <th className="px-5 py-4 text-sm font-bold uppercase tracking-wide">
                    Academic
                  </th>
                  <th className="px-5 py-4 text-sm font-bold uppercase tracking-wide">
                    Industrial
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {chargeableInstruments.map((instrument, index) => (
                  <tr
                    key={instrument.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="px-5 py-4">
                      <Link
                        to={`/instruments/${instrument.id}`}
                        className="font-bold text-blue-800 hover:text-teal-700"
                      >
                        {instrument.name}
                      </Link>
                      <p className="mt-1 text-sm text-slate-500">
                        {instrument.fullName}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-700">
                      {instrument.model}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {instrument.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-emerald-700">
                      {formatCharge(instrument.usageCharges.academic)}
                    </td>
                    <td className="px-5 py-4 font-bold text-orange-700">
                      {formatCharge(instrument.usageCharges.industrial)}
                    </td>
                  </tr>
                ))}

                {chargeableInstruments.length === 0 && (
                  <tr>
                    <td className="px-5 py-12 text-center text-slate-500" colSpan="5">
                      No instruments found for the selected search/filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
