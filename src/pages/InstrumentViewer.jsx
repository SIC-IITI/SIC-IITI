import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Mail, ArrowLeft } from 'lucide-react';
import instrumentsData from '../data/instrumentsData';

const InstrumentViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [instrument, setInstrument] = useState(null);

  useEffect(() => {
    // Load the correct instrument from the data file
    if (instrumentsData[id]) {
      setInstrument(instrumentsData[id]);
      setCurrentImage(0);
    } else {
      setInstrument(null);
    }
  }, [id]);

  const nextImage = () => {
    if (instrument) {
      setCurrentImage((prev) => (prev + 1) % instrument.images.length);
    }
  };

  const prevImage = () => {
    if (instrument) {
      setCurrentImage(
        (prev) => (prev - 1 + instrument.images.length) % instrument.images.length
      );
    }
  };

  if (!instrument) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Instrument not found...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-900 text-white py-6 px-8 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{instrument.name}</h1>
          <p className="text-blue-200 mt-2">{instrument.organization}</p>
        </div>
        <button
          onClick={() => navigate('/instruments')}
          className="flex items-center gap-2 text-blue-100 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          Back to Instruments
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Model */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Model</h2>
              <p className="text-gray-700">{instrument.model}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Features</h2>
              <ul className="space-y-2">
                {instrument.features.map((feature, index) => (
                  <li key={index} className="text-gray-700 flex">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Applications</h2>
              <ul className="space-y-2">
                {instrument.applications.map((application, index) => (
                  <li key={index} className="text-gray-700 flex">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{application}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Table */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-700">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Analysis Charges</h2>

              {/* Internal Pricing */}
              <div className="mb-6 bg-green-50 border-2 border-green-400 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-green-900 text-lg">
                      {instrument.pricing.internal.category}
                    </h3>
                    <p className="text-sm text-green-700 mt-1">
                      {instrument.pricing.internal.description}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {instrument.pricing.internal.price}
                  </div>
                </div>
              </div>

              {/* External Pricing Table */}
              <div>
                <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                  External Users
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-900 text-white">
                        <th className="py-3 px-4 text-left font-semibold">
                          User Category
                        </th>
                        <th className="py-3 px-4 text-right font-semibold">
                          Charges
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {instrument.pricing.external.map((item, index) => (
                        <tr
                          key={index}
                          className={`border-b border-blue-100 ${
                            index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                          } hover:bg-blue-100`}
                        >
                          <td className="py-3 px-4 text-gray-800">{item.category}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="font-semibold text-blue-900">
                              {item.price}
                            </span>
                            <span className="text-sm text-gray-600 ml-1">
                              / {item.unit}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Handler */}
            <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">
                Contact Information
              </h2>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Handled By:</span>{' '}
                {instrument.handler.name}
              </p>
              <a
                href={`mailto:${instrument.handler.email}`}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <Mail size={18} />
                {instrument.handler.email}
              </a>
            </div>

            {/* Form Submission Button */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
                Collect Your Data
              </button>
            </div>
          </div>

          {/* Right Side - Image Slider */}
          <div className="lg:col-span-2 lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="relative">
                <img
                  src={instrument.images[currentImage]}
                  alt={`${instrument.name} - Image ${currentImage + 1}`}
                  className="w-full h-80 object-cover rounded-lg"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-blue-900 p-2 rounded-full shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-blue-900 p-2 rounded-full shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-900/80 text-white px-4 py-2 rounded-full text-sm">
                  {currentImage + 1} / {instrument.images.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {instrument.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImage === index
                        ? 'border-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentViewer;
