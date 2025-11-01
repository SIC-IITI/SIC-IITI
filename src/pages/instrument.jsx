import React, { useState } from 'react';
import { Search, Calendar, Activity, BookOpen } from 'lucide-react';

// Instruments Data
const instrumentsData = [
  {
    id: 1,
    name: "3D Printer (RAISE3D N2)",
    category: "Additive Manufacturing",
    manufacturer: "RAISE3D",
    model_number: "N2",
    labName: "3D Lab IIT INDORE",
    subheading: "SIC Adopted Lab",
    description: "Advanced 3D printer operating on Fused Deposition Modeling (FDM) technology for rapid prototyping and research applications.",
    image_url: "https://images.unsplash.com/photo-1564375273161-be6684e8d77f?w=800&q=80",
    availability_status: "available",
    about: "The RAISE3D N2 is an advanced 3D printer that operates on Fused Deposition Modeling (FDM) technology. FDM is a filament-based additive manufacturing process where a temperature-controlled print head extrudes thermoplastic material layer by layer. A water-soluble support structure is generated where necessary to maintain model accuracy and complexity.",
    printingRequirements: [
      { label: "File format", value: ".stl" },
      { label: "Maximum dimensions", value: "25 cm x 25 cm x 25 cm" },
      { label: "Printing material", value: "Polylactic Acid (PLA)" },
      { label: "Support material", value: "High Impact Polystyrene (HIPS)" }
    ],
    technicalSpecifications: [
      { parameter: "Printer Model", details: "RAISE3D N2" },
      { parameter: "Technology", details: "Fused Deposition Modeling (FDM)" },
      { parameter: "Build Volume", details: "305 × 305 × 305 mm" },
      { parameter: "Layer Resolution", details: "0.01 mm – 0.25 mm" },
      { parameter: "Filament Diameter", details: "1.75 mm" },
      { parameter: "Supported Materials", details: "PLA, ABS, PETG, Nylon, HIPS" },
      { parameter: "Max Extruder Temp.", details: "300°C" },
      { parameter: "Build Plate Temp.", details: "110°C" },
      { parameter: "Connectivity", details: "USB, Wi-Fi, LAN" }
    ],
    applicationsResearch: "The 3D Printer at CRF-IIT Delhi caters to diverse research and prototyping requirements. It facilitates rapid prototyping of mechanical parts for mechanical design studies, enables testing and exploration of various thermoplastic materials for material research, and allows the creation of precise 3D-scaled architectural models for design visualization. Additionally, it supports the fabrication of customized lab equipment, including specialized tools and fixtures, to meet specific experimental needs.",
    charges: [
      { label: "Booking Charge", value: "₹100/- (Standard fee for all 3D printing jobs)" },
      { label: "Cost for IIT Indore Students", value: "Free of charge (only booking fee applicable)" },
      { label: "Cost for External Users", value: "Total cost depends on material usage and printing time, plus 18% GST" },
      { label: "Procedure", value: "Users should meet the Operational In-Charge with their 3D model file (.stl format) to check feasibility and get an estimated total cost before booking a slot" },
      { label: "Non-IIT Indore Users", value: "Please contact the Coordinator / Operational In-Charge for details on charges" }
    ],
    contact: {
      physicalLocation: {
        name: "3D Printing Lab",
        room: "Room No. WS 109D, Central Workshop",
        institute: "Indian Institute of Technology Indore",
        address: "Khandwa Road, Simrol, Indore – 453552"
      },
      coordinator: {
        name: "Prof. Sunil Jha",
        designation: "Head, Central Workshop",
        institute: "Indian Institute of Technology Indore",
        phone: "(91)-11-26591949",
        email: "suniljha@mech.iitd.ac.in"
      },
      labStaff: {
        name: "Mr. Tarun Singh",
        designation: "Project Attendant",
        room: "Room No. 614B, POD A",
        institute: "Indian Institute of Technology Indore",
        phone: "011-2659-6702",
        email: "iitd13728@crf.iitd.ac.in"
      }
    }
  },
  {
    id: 2,
    name: "X-Ray Diffractometer",
    category: "Spectroscopy",
    manufacturer: "Bruker",
    model_number: "D8 Advance",
    labName: "Materials Science Lab",
    subheading: "Advanced Materials Research Facility",
    description: "Advanced X-ray diffraction system for crystal structure determination and phase analysis.",
    image_url: "https://images.unsplash.com/photo-1581093458791-9d42e837d4c6?w=800&q=80",
    availability_status: "available",
    about: "The Bruker D8 Advance is a state-of-the-art X-ray diffractometer designed for high-precision crystal structure analysis and phase identification. It utilizes Cu Kα radiation to probe the atomic structure of materials.",
    printingRequirements: [
      { label: "Sample preparation", value: "Powder or thin film samples" },
      { label: "Sample size", value: "Minimum 100 mg for powder" },
      { label: "Sample holder", value: "Standard or zero-background holders" }
    ],
    technicalSpecifications: [
      { parameter: "Radiation Source", details: "Cu Kα" },
      { parameter: "Goniometer Radius", details: "280 mm" },
      { parameter: "2θ Range", details: "-110° to 168°" },
      { parameter: "Resolution", details: "0.0001°" },
      { parameter: "Detector", details: "LYNXEYE XE-T" }
    ],
    applicationsResearch: "Crystal structure analysis, phase identification, crystallite size determination, texture analysis, and thin film characterization for materials science research.",
    charges: [
      { label: "Internal Users", value: "₹500/- per hour" },
      { label: "External Academic", value: "₹1500/- per hour + 18% GST" },
      { label: "External Industry", value: "₹3000/- per hour + 18% GST" }
    ],
    contact: {
      physicalLocation: {
        name: "XRD Lab",
        room: "Building A, Room 205",
        institute: "Indian Institute of Technology Indore",
        address: "Khandwa Road, Simrol, Indore – 453552"
      },
      coordinator: {
        name: "Dr. Michael Chen",
        designation: "Professor, Materials Science",
        institute: "Indian Institute of Technology Indore",
        phone: "(91)-11-26591950",
        email: "michael.chen@iiti.ac.in"
      },
      labStaff: {
        name: "Ms. Priya Sharma",
        designation: "Technical Officer",
        room: "Building A, Room 205A",
        institute: "Indian Institute of Technology Indore",
        phone: "011-2659-6703",
        email: "priya.sharma@iiti.ac.in"
      }
    }
  },
  {
    id: 3,
    name: "Scanning Electron Microscope",
    category: "Microscopy",
    manufacturer: "ZEISS",
    model_number: "Sigma 300",
    labName: "Electron Microscopy Lab",
    subheading: "Advanced Imaging Facility",
    description: "High-resolution field emission SEM for advanced imaging and analysis of materials at nanoscale.",
    image_url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80",
    availability_status: "available",
    about: "The ZEISS Sigma 300 is a field emission scanning electron microscope offering exceptional resolution and versatility for nanoscale imaging and analysis.",
    printingRequirements: [
      { label: "Sample preparation", value: "Conductive coating required for non-conductive samples" },
      { label: "Sample size", value: "Up to 200 mm diameter" },
      { label: "Sample mounting", value: "Standard SEM stubs" }
    ],
    technicalSpecifications: [
      { parameter: "Resolution", details: "0.8 nm at 15 kV" },
      { parameter: "Magnification", details: "12× to 2,000,000×" },
      { parameter: "Accelerating Voltage", details: "0.02 to 30 kV" },
      { parameter: "Detectors", details: "SE, BSE, EDX" },
      { parameter: "Sample Size", details: "Up to 200 mm diameter" }
    ],
    applicationsResearch: "Surface morphology analysis, nanostructure characterization, elemental composition analysis, failure analysis, and material quality control.",
    charges: [
      { label: "Internal Users", value: "₹800/- per hour" },
      { label: "External Academic", value: "₹2000/- per hour + 18% GST" },
      { label: "External Industry", value: "₹4000/- per hour + 18% GST" }
    ],
    contact: {
      physicalLocation: {
        name: "SEM Lab",
        room: "Building B, Room 301",
        institute: "Indian Institute of Technology Indore",
        address: "Khandwa Road, Simrol, Indore – 453552"
      },
      coordinator: {
        name: "Dr. Sarah Williams",
        designation: "Associate Professor, Physics",
        institute: "Indian Institute of Technology Indore",
        phone: "(91)-11-26591951",
        email: "sarah.williams@iiti.ac.in"
      },
      labStaff: {
        name: "Mr. Rajesh Kumar",
        designation: "Senior Technical Assistant",
        room: "Building B, Room 301A",
        institute: "Indian Institute of Technology Indore",
        phone: "011-2659-6704",
        email: "rajesh.kumar@iiti.ac.in"
      }
    }
  },
  {
    id: 4,
    name: "NMR Spectrometer",
    category: "Spectroscopy",
    manufacturer: "Agilent",
    model_number: "DD2 500",
    labName: "NMR Facility",
    subheading: "Molecular Structure Analysis Lab",
    description: "High-field NMR spectrometer for molecular structure determination and chemical analysis.",
    image_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
    availability_status: "under_maintenance",
    about: "The Agilent DD2 500 is a high-field NMR spectrometer equipped with advanced automation for molecular structure elucidation and chemical analysis.",
    printingRequirements: [
      { label: "Sample preparation", value: "Dissolved in deuterated solvent" },
      { label: "Sample volume", value: "0.5-0.6 mL in 5mm NMR tube" },
      { label: "Sample concentration", value: "1-10 mg/mL recommended" }
    ],
    technicalSpecifications: [
      { parameter: "Field Strength", details: "11.7 Tesla (500 MHz)" },
      { parameter: "Probe", details: "5mm AutoX DB" },
      { parameter: "Temperature Range", details: "-150°C to +150°C" },
      { parameter: "Shimming", details: "Automated 3D gradient shimming" },
      { parameter: "Sample Changer", details: "60-position" }
    ],
    applicationsResearch: "Molecular structure elucidation, protein structure analysis, reaction monitoring, quantitative analysis, and dynamics studies.",
    charges: [
      { label: "Internal Users", value: "₹1000/- per hour" },
      { label: "External Academic", value: "₹2500/- per hour + 18% GST" },
      { label: "External Industry", value: "₹5000/- per hour + 18% GST" },
      { label: "Note", value: "Currently under maintenance - Expected availability: December 2025" }
    ],
    contact: {
      physicalLocation: {
        name: "NMR Lab",
        room: "Building C, Room 102",
        institute: "Indian Institute of Technology Indore",
        address: "Khandwa Road, Simrol, Indore – 453552"
      },
      coordinator: {
        name: "Dr. James Rodriguez",
        designation: "Professor, Chemistry",
        institute: "Indian Institute of Technology Indore",
        phone: "(91)-11-26591952",
        email: "james.rodriguez@iiti.ac.in"
      },
      labStaff: {
        name: "Dr. Anjali Verma",
        designation: "Research Scientist",
        room: "Building C, Room 102B",
        institute: "Indian Institute of Technology Indore",
        phone: "011-2659-6705",
        email: "anjali.verma@iiti.ac.in"
      }
    }
  }
];

// Main App Component
const InstrumentsApp = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInstrumentClick = (instrument) => {
    setSelectedInstrument(instrument);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedInstrument(null);
  };

  const filteredInstruments = instrumentsData.filter(instrument =>
    instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instrument.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instrument.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {currentView === 'list' && (
        <InstrumentsList
          instruments={filteredInstruments}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onInstrumentClick={handleInstrumentClick}
        />
      )}
      {currentView === 'detail' && selectedInstrument && (
        <InstrumentViewer
          instrument={selectedInstrument}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

// Instruments List Component
const InstrumentsList = ({ instruments, searchQuery, setSearchQuery, onInstrumentClick }) => {
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/70 to-blue-900/90"></div>

        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4 tracking-wide">
            Research Instruments
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 text-center mb-12 max-w-3xl">
            State-of-the-art laboratory and research equipment for scientific excellence
          </p>

          <div className="flex flex-wrap gap-6 justify-center">
            <button className="group px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              View Appointment Slot
            </button>
            <button className="group px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              View Facility Status
            </button>
            <button className="group px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Book Your Instrument
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white py-12 shadow-md">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your Instruments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-400 text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-10 py-4 bg-teal-400 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Instruments Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instruments.map((instrument) => (
            <div
              key={instrument.id}
              onClick={() => onInstrumentClick(instrument)}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-teal-400 transition-all duration-300 cursor-pointer group"
            >
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img
                  src={instrument.image_url}
                  alt={instrument.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                  {instrument.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{instrument.category}</p>
                {instrument.availability_status === 'under_maintenance' && (
                  <span className="inline-block mt-3 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                    Under Maintenance
                  </span>
                )}
                {instrument.availability_status === 'available' && (
                  <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Available
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Instrument Detail Viewer Component
const InstrumentViewer = ({ instrument, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2"
        >
          ← Back to Instruments
        </button>

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
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About the Instrument</h2>
          <p className="text-gray-700 leading-relaxed">{instrument.about}</p>
        </section>

        {/* Requirements */}
        {instrument.printingRequirements && (
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
        {instrument.technicalSpecifications && (
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
        {instrument.charges && (
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
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Physical Location:</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">{instrument.contact.physicalLocation.name}</p>
                  <p>{instrument.contact.physicalLocation.room}</p>
                  <p>{instrument.contact.physicalLocation.institute}</p>
                  <p>{instrument.contact.physicalLocation.address}</p>
                </div>
              </div>

              {/* Coordinator */}
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

              {/* Lab Staff */}
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
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default InstrumentsApp;