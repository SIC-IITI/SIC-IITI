// src/pages/InstrumentViewer.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instrumentsData from '../../data/instrumentsData';

const InstrumentViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the instrument by ID
  const instrument = instrumentsData.find(inst => inst.id === parseInt(id));

  // If instrument not found, show error message
  if (!instrument) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Instrument Not Found</h1>
          <p className="text-gray-600 mb-8">The instrument you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/instruments')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Back to Instruments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        {/* <button
          onClick={() => navigate('/instruments')}
          className="mb-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2"
        >
          ← Back to Instruments
        </button> */}

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            {instrument.name}
          </h1>
          <p className="text-xl text-gray-600">{instrument.labName}</p>
          <p className="text-lg text-gray-500">{instrument.subheading}</p>

        </div>

        {/* Image Section */}
        <div className="mb-12">
          <img
            src={instrument.image_url}
            alt={instrument.name}
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* About Section */}
        {instrument.about && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About the Instrument</h2>
            <p className="text-gray-700 leading-relaxed">{instrument.about}</p>
          </section>
        )}

        {/* Requirements Section */}
        {instrument.printingRequirements && instrument.printingRequirements.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Requirements</h2>
            <ul className="space-y-3">
              {instrument.printingRequirements.map((req, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold">{req.label}:</span> {req.value}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Technical Specifications */}
        {instrument.technicalSpecifications && instrument.technicalSpecifications.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-800">
                      Parameter
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-800">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {instrument.technicalSpecifications.map((spec, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-6 py-3 text-gray-700">
                        {spec.parameter}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-gray-700">
                        {spec.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Applications & Research */}
        {instrument.applicationsResearch && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Applications & Research</h2>
            <p className="text-gray-700 leading-relaxed">{instrument.applicationsResearch}</p>
          </section>
        )}

        {/* Charges */}
        {instrument.charges && instrument.charges.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Charges</h2>
            <ul className="space-y-4">
              {instrument.charges.map((charge, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold">{charge.label}:</span> {charge.value}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Booking Button */}
        <div className="mb-12 text-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-4 px-12 rounded-lg shadow-lg transition duration-300">
            Book Now
          </button>
        </div>

        {/* Contact Section */}
        {instrument.contact && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Contact</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Physical Location */}
              {instrument.contact.physicalLocation && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Physical Location:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-semibold">{instrument.contact.physicalLocation.name}</p>
                    <p>{instrument.contact.physicalLocation.room}</p>
                    <p>{instrument.contact.physicalLocation.institute}</p>
                    <p>{instrument.contact.physicalLocation.address}</p>
                  </div>
                </div>
              )}

              {/* Coordinator */}
              {instrument.contact.coordinator && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Coordinator:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-semibold">{instrument.contact.coordinator.name}</p>
                    <p>{instrument.contact.coordinator.designation}</p>
                    <p>{instrument.contact.coordinator.institute}</p>
                    <p className="flex items-center">
                      <span className="mr-2">📞</span>
                      Tel: {instrument.contact.coordinator.phone}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">✉️</span>
                      Email: <a href={`mailto:${instrument.contact.coordinator.email}`} className="text-blue-600 hover:underline ml-1">
                        {instrument.contact.coordinator.email}
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {/* Lab Staff */}
              {instrument.contact.labStaff && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Lab Staff:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-semibold">{instrument.contact.labStaff.name} – {instrument.contact.labStaff.designation}</p>
                    <p>{instrument.contact.labStaff.room}</p>
                    <p>{instrument.contact.labStaff.institute}</p>
                    <p className="flex items-center">
                      <span className="mr-2">📞</span>
                      Tel: {instrument.contact.labStaff.phone}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">✉️</span>
                      Email: <a href={`mailto:${instrument.contact.labStaff.email}`} className="text-blue-600 hover:underline ml-1">
                        {instrument.contact.labStaff.email}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default InstrumentViewer;