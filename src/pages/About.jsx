import React from 'react';

function About() {
  return (
    <section className="space-y-8 px-4 py-12 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold  text-blue-900 mb-6">About SIC</h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          The Sophisticated Instrumentation Center supports cutting-edge research across disciplines by centralizing high-end scientific equipment, expert operators, and standardized procedures. Established in September 2011, SIC has become a crucial hub for research and development at IIT Indore and a national resource for academia and industry.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Enable reliable measurements, user training, and collaborative research through shared facilities. We strive to support research across all disciplines and foster a spirit of scientific inquiry.
          </p>
        </div>
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">Our Scope</h2>
          <p className="text-gray-600 leading-relaxed">
            Materials characterization, microscopy, spectroscopy, diffraction, and more. We support academia and industry with expertise in diverse analytical techniques and scientific instruments.
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h2>
        <p className="text-gray-600 leading-relaxed">
          To be a leading national facility that provides cutting-edge instrumentation services, spreading awareness among researchers and industries for the probable use of facilities among diverse users. Making SIC a part of mutual co-existence to enhance the quality of research and products in industries.
        </p>
      </div>
    </section>
  );
}

export default About;
