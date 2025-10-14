import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageScroll from '../components/ImageScroll';

function Home() {
  const navigate = useNavigate();
  return (
    <section className="space-y-12">
      {/* Hero Section */}
      <div className="rounded-xl border border-blue-200 bg-white overflow-hidden shadow-lg">
        <div className="relative h-80 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
          <img
            src="/sic.png"
            alt="SIC facility exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="p-8 bg-white">
          <h1 className="text-4xl font-bold text-blue-900">
            Sophisticated Instrumentation Center (SIC)
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-4xl text-lg">
            A National Facility established in September 2011 to expedite the research program at IIT Indore. Now serving academia and industry from across the country and international centers with state-of-the-art instrumentation, expert staff, and standardized processes for training, measurement, and analysis.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <button onClick={() => navigate('/instruments')} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700">
              Explore Instruments <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/booking')} className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 text-blue-600 px-6 py-3 font-medium hover:bg-blue-50">
              Book a Slot <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Scroll */}
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Explore Our Facilities</h2>
        <ImageScroll />
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
            <span className="text-xl">🔬</span>
          </div>
          <h3 className="text-lg font-semibold text-blue-900">Central Access</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Streamlined access to high-end equipment across disciplines with standardized SOPs and trained operators.
          </p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
            <span className="text-xl">👨‍🏫</span>
          </div>
          <h3 className="text-lg font-semibold text-blue-900">Training & Support</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Regular user training, safety briefings, and technical guidance to ensure reliable data quality.
          </p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
            <span className="text-xl">💰</span>
          </div>
          <h3 className="text-lg font-semibold text-blue-900">Transparent Charges</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Clear, tiered usage charges for internal and external users to support sustainable operations.
          </p>
        </div>
      </div>

      {/* Impact Section */}
      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
        <p className="leading-relaxed">
          With limited research facilities in central India, SIC is catering to the needs of many educational institutes and industries in and around central India. IIT Indore now stands as one of the leaders among all IITs in research output, with each publication supported by instrumental expertise from SIC. We welcome academia and industries to explore our state-of-the-art instrumentation facilities and get their samples tested with our expert technical team.
        </p>
      </div>
    </section>
  );
}

export default Home;
