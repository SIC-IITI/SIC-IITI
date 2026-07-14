import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FileText, Download, ArrowRight } from "lucide-react";
import instrumentsData, {
    instrumentForms,
} from "../../data/instrumentsData";

// Map each form to its instrument's category (if possible), otherwise "Other"
const getFormCategory = (formName) => {
    const normalise = (s) => s.toLowerCase().replace(/[\s\-_]/g, "");
    const match = instrumentsData.find(
        (inst) =>
            normalise(inst.name) === normalise(formName) ||
            normalise(inst.fullName) === normalise(formName)
    );
    return match ? match.category : "Other";
};

const InstrumentForms = () => {
    const groupedForms = useMemo(() => {
        const groups = {};
        instrumentForms.forEach((form) => {
            const category = getFormCategory(form.name);
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(form);
        });
        return groups;
    }, []);

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

                    {/* Forms grouped by category */}
                    <div className="space-y-12">
                        {Object.entries(groupedForms).map(([category, forms]) => (
                            <div key={category}>
                                {/* Category Heading */}
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200">
                                    {category}
                                </h2>

                                {/* 4-column grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    {forms.map((form, index) => (
                                        <a
                                            key={index}
                                            href={form.file}
                                            download
                                            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-400 hover:shadow-lg flex flex-col items-center text-center"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white mb-4 group-hover:bg-blue-700 transition-colors">
                                                <FileText className="w-5 h-5" />
                                            </div>

                                            <h3 className="text-sm font-semibold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                                                {form.name}
                                            </h3>

                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                                                <Download className="w-3.5 h-3.5" />
                                                Download Form
                                            </span>
                                        </a>
                                    ))}
                                </div>
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