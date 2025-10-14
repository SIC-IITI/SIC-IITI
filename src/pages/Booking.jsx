import React from 'react';

function Booking() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Book Instrumentation Time</h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          Reserve time on any of our advanced instruments via our official request process. Provide project details, required instrument, and preferred time slots. Our staff will confirm availability and verify safety/eligibility.
        </p>
      </div>

      <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Booking Process</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
            <div>
              <h3 className="font-bold text-blue-900">Review Instrument SOP</h3>
              <p className="text-gray-600 mt-1">Study the Standard Operating Procedure and training prerequisites for your selected instrument.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
            <div>
              <h3 className="font-bold text-blue-900">Prepare Experiment Details</h3>
              <p className="text-gray-600 mt-1">Write a brief description of your experiment, samples, and expected outcomes.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
            <div>
              <h3 className="font-bold text-blue-900">Submit Booking Request</h3>
              <p className="text-gray-600 mt-1">Submit your request with preferred dates, durations, and any special requirements.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">4</div>
            <div>
              <h3 className="font-bold text-blue-900">Await Confirmation</h3>
              <p className="text-gray-600 mt-1">Our team will confirm availability. Bring sample handling PPE and follow safety protocols.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-2 border-dashed border-blue-300 bg-white p-8 text-center">
        <p className="text-gray-600 mb-4">Ready to book your slot?</p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Open Booking Form
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-900 font-semibold mb-2">📋 Note:</p>
        <p className="text-yellow-800">Booking form integration with your preferred system will be added soon. For now, please contact us directly at sic@iiti.ac.in or managersic@iiti.ac.in</p>
      </div>
    </section>
  );
}

export default Booking;
