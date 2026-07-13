import React from "react";
import { Link } from "react-router-dom";
import { FileText, Download, ArrowRight } from "lucide-react";
import {
    sampleAnalysisInfo,
    instrumentForms,
} from "../../data/instrumentsData";

const InstrumentForms = () => {
    return (
        <div className="min-h-screen bg-[#f4f7fb] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-white p-8 shadow-xl">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
                                Instruments
                            </p>
                            <h1 className="mt-3 text-4xl font-bold text-slate-900">Download Forms</h1>
                            <p className="mt-4 max-w-2xl text-base text-slate-600">
                                Download the latest SIC instrument forms for sample submission and booking.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/instruments"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <ArrowRight className="w-4 h-4" />
                                Back to Instruments
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {/* Dynamic Instrument Forms */}
                        {instrumentForms.map((form, index) => (
                            <div
                                key={index}
                                className="group rounded-3xl border border-slate-200 bg-white p-8 transition hover:border-blue-400 hover:shadow-lg"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white mb-5">
                                    <FileText className="w-6 h-6" />
                                </div>

                                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                                    {form.name}
                                </h2>

                                <p className="text-slate-600 mb-5">
                                    Download the requisition/sample submission form.
                                </p>

                                <a
                                    href={form.file}
                                    download
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Download Form
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-white">
                        <h2 className="text-2xl font-semibold mb-4">How to use these forms</h2>
                        <ul className="space-y-3 text-slate-200">
                            <li>1. Download the relevant form from the links above.</li>
                            <li>2. Fill in the required instrument details, sample information, and payment reference.</li>
                            <li>3. Submit the completed form to SIC along with the payment receipt as directed.</li>
                            <li>4. For instrument-specific help, open the instrument detail page and click the Download Forms button there.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstrumentForms;