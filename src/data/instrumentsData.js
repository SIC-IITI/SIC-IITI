
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

export default instrumentsData;