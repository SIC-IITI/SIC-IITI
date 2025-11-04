import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

function FAQ() {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      q: "How do I get trained to use an instrument?",
      a: "Submit a training request through our website or contact us directly. Our staff will schedule a session, assess prerequisites, and provide comprehensive training including safety protocols and operation procedures.",
    },
    {
      q: "Can external users access SIC?",
      a: "Yes! External users from academia, industry, and international centers are welcome. Access is subject to availability and applicable charges. We have flexible fee structures for students, academics, and commercial users.",
    },
    {
      q: "Where can I find SOPs (Standard Operating Procedures)?",
      a: "SOPs are shared during training sessions. You can request sample SOPs from the facility office via email or phone. Most instruments have detailed digital and printed documentation available.",
    },
    {
      q: "What are the charges for using instruments?",
      a: "Charges are tiered based on user category (internal, academic, industry) and instrument type. Contact our office for detailed pricing. We aim to keep costs transparent and affordable for all users.",
    },
    {
      q: "How long does the booking process take?",
      a: "Typically, bookings are confirmed within 2-3 business days, subject to equipment availability. Emergency requests may be accommodated with advance notice.",
    },
    {
      q: "Do you provide sample analysis services?",
      a: "Yes, our expert technical team can analyze samples using our instruments. Contact us to discuss your requirements and get a quote.",
    },
  ];

  return (
    <section className="space-y-8 px-4 py-12 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          Find answers to common questions about our facility, instruments, and booking process.
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
        <h2 className="text-2xl font-bold mb-3">Didn't find your answer?</h2>
        <p className="mb-6">Contact our team directly. We're here to help!</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
          Contact Us
        </button>
      </div>
    </section>
  );
}

export default FAQ;
