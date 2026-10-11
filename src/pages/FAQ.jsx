import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from "react-i18next";

function FAQ() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      q: t('faq.q1'),
      a: t('faq.a1'),
    },
    {
      q: t('faq.q2'),
      a: t('faq.a2'),
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3'),
    },
    {
      q: t('faq.q4'),
      a: t('faq.a4'),
    },
    {
      q: t('faq.q5'),
      a: t('faq.a5'),
    },
    {
      q: t('faq.q6'),
      a: t('faq.a6'),
    },
  ];

  return (
    <section className="space-y-8 px-4 py-12 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">{t('faq.title')}</h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          {t('faq.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="rounded-lg border border-blue-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
            <button
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-50"
            >
              <p className="font-semibold text-blue-900">{item.q}</p>
              <div className={`text-blue-600 transform transition-transform ${expanded === idx ? 'rotate-90' : ''}`}>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
            {expanded === idx && (
              <div className="px-6 pb-6 border-t border-blue-200 text-gray-600 bg-blue-50">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-blue-600 text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">{t('faq.ctaTitle')}</h2>
        <p className="mb-6">{t('faq.ctaSubtitle')}</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
          {t('faq.ctaButton')}
        </button>
      </div>
    </section>
  );
}

export default FAQ;
