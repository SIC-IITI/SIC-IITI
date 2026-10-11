import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FileText, Download, ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
    sampleAnalysisInfo,
    instrumentForms,
} from "../../data/instrumentsData";
import { useInstrumentsData } from "../../hooks/useInstrumentsData";

const InstrumentForms = () => {
    const { t } = useTranslation();
    const { instruments: instrumentsData } = useInstrumentsData();

    const groupedForms = useMemo(() => {
        const grouped = {};
        const orderOf = (form) => {
            const idx = instrumentsData.findIndex((item) => item.id === form.instrumentId);
            return idx === -1 ? Infinity : idx;
        };
        const orderedForms = [...instrumentForms].sort((a, b) => {
            const oa = orderOf(a);
            const ob = orderOf(b);
            if (oa === ob) return 0;
            return oa === Infinity ? 1 : ob === Infinity ? -1 : oa - ob;
        });
        orderedForms.forEach((form) => {
            const instrument = instrumentsData.find(
                (item) => item.id === form.instrumentId
            );
            const category = instrument?.category || "Other";
            const instrumentName = instrument?.name || "Other";

            if (!grouped[category]) {
                grouped[category] = {};
            }
            if (!grouped[category][instrumentName]) {
                grouped[category][instrumentName] = [];
            }
            grouped[category][instrumentName].push(form);
        });
        return grouped;
    }, [instrumentsData]);

    return (
        <div className="min-h-screen bg-[#f4f7fb] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-white p-8 shadow-xl">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
                                {t('forms.label')}
                            </p>
                            <h1 className="mt-3 text-4xl font-bold text-slate-900">{t('forms.title')}</h1>
                            <p className="mt-4 max-w-2xl text-base text-slate-600">
                                {t('forms.subtitle')}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/instruments"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                {t('forms.backToInstruments')}
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {Object.entries(groupedForms).map(([category, instrumentsMap]) => (
                            <div key={category}>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-600">
                                    {category}
                                </h2>

                                <div className="space-y-10">
                                    {Object.entries(instrumentsMap).map(([instrumentName, forms]) => (
                                        <div key={instrumentName}>
                                            <h3 className="text-lg font-semibold text-blue-700 mb-4">
                                                {instrumentName}
                                            </h3>

                                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                                {forms.map((form, index) => (
                                                    <div
                                                        key={index}
                                                        className="group rounded-3xl border border-slate-200 bg-white p-8 transition hover:border-blue-400 hover:shadow-lg"
                                                    >
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white mb-5">
                                                            <FileText className="w-6 h-6" />
                                                        </div>

                                                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                                            {form.name}
                                                        </h3>

                                                        <p className="text-slate-600 mb-5">
                                                            {t('forms.downloadDesc')}
                                                        </p>

                                                        <a
                                                            href={form.file}
                                                            download
                                                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                                                        >
                                                            {t('forms.downloadForm')}
                                                            <ArrowRight className="w-4 h-4" />
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-white">
                        <h2 className="text-2xl font-semibold mb-4">{t('forms.howToUse')}</h2>
                        <ul className="space-y-3 text-slate-200">
                            <li>{t('forms.step1')}</li>
                            <li>{t('forms.step2')}</li>
                            <li>{t('forms.step3')}</li>
                            <li>{t('forms.step4')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstrumentForms;
