// data/instrumentsData.js

const instrumentsData = [
  // ==================== X-RAY ANALYSIS ====================
  {
    id: "scxrd",
    name: "SCXRD",
    fullName: "Single Crystal X-Ray Diffractometer",
    category: "X-Ray",
    model: "Agilent Technologies Super Nova System",
    features: [
      "State of the art dual core Agilent Technologies (Oxford Diffraction) Super Nova CCD System",
      "Access to micro-focus Cu and Mo sources which allows even small-size crystals data collection",
      "Oxford Cryosystems which enable temperature range from 90 to 400K",
      "High-definition microscopes for the separation and mounting of crystals",
      "Dual wavelength capability (Cu Kα and Mo Kα)",
      "CCD detector for high-sensitivity data collection"
    ],
    applications: [
      "Crystal screening and mounting, including air-sensitive samples",
      "Diffraction data collection under various conditions, including temperatures as low as 90 K",
      "Structure solution, refinement, and interpretation up to publication level",
      "Cambridge Structure Database searching",
      "Structural evaluation of compounds",
      "Lattice information and unit cell determination",
      "X-ray crystallography of proteins and small molecules",
      "Polymorphism and co-crystal studies"
    ],
    specifications: {
      temperature: "90-400 K",
      radiation: "Cu Kα (λ=1.5418 Å) and Mo Kα (λ=0.7107 Å)",
      detector: "CCD Detector",
      sampleSize: "Microcrystals to large single crystals"
    },
    handledBy: "Mr. Kinny Pandey",
    email: "kinny@iiti.ac.in",
    image: "path/to/scxrd-image.jpg"
  },
  {
    id: "eds-edx",
    name: "EDS/EDX",
    fullName: "Energy Dispersive X-Ray Spectroscopy",
    category: "X-Ray",
    model: "Oxford X-MAX 20",
    features: [
      "Integrated with SEM, TEM, or FIB systems",
      "Non-destructive elemental analysis",
      "Micro and nanoscale compositional mapping",
      "Rapid qualitative and quantitative analysis",
      "Detection of elements from beryllium (Be) to uranium (U)",
      "High spatial resolution for localized analysis"
    ],
    applications: [
      "Phase identification in alloys, ceramics, and composites",
      "Failure analysis and impurity detection",
      "Microstructural analysis of grain boundaries and inclusions",
      "Dopant distribution mapping in semiconductors",
      "Contamination analysis on semiconductor wafers",
      "Thin film composition analysis",
      "Nanomaterial characterization and catalysis research",
      "Mineral identification and petrographic studies",
      "Environmental analysis of pollutants",
      "Elemental mapping in biological tissues",
      "Pharmaceutical composition analysis",
      "Archaeological artifact authentication",
      "Forensic trace evidence analysis"
    ],
    specifications: {
      elementRange: "Be (4) to U (92)",
      resolution: "< 129 eV (typical)",
      detectionLimit: "0.1 wt% (typical)"
    },
     handledBy: "Mr. Kinny Pandey",
    email: "kinny@iiti.ac.in",
    image: "path/to/scxrd-image.jpg"
  },
  {
    id: "bse-bsd",
    name: "BSE/BSD",
    fullName: "Backscattered Electron Detector",
    category: "X-Ray",
    model: "Gemini 360",
    features: [
      "The BSE detector in the Gemini SEM360 is designed to capture high-energy electrons that are reflected or backscattered from the sample. BSE imaging provides contrast based on the atomic number of elements, making it useful for compositional analysis. Heavier elements appear brighter, allowing for differentiation between different materials within the sample.",

    ],
    applications: [
      "Material composition analysis with atomic number contrast",
      "Phase identification in multiphase materials",
      "Grain boundary and microstructural analysis",
      "Inclusion and void detection",
      "Semiconductor layered structure examination",
      "Mineral differentiation in geological samples",
      "Bone and tissue composition analysis",
      "Forensic residue analysis",
      "Archaeological artifact characterization",
      "Corrosion and failure analysis",
      "Quality control in coating applications"
    ],
    specifications: {
      contrast: "Atomic number (Z) dependent",
      resolution: "Dependent on SEM specifications",
      applications: "Compositional and topographical contrast"
    },
    handledBy: "Er. Atul Singh",
    email: "atul.singh@iiti.ac.in",
    image: "path/to/bse-image.jpg"
  },

  // ==================== MICROSCOPY ====================
  {
    id: "supra-55",
    name: "Supra 55",
    fullName: "Field Emission Scanning Electron Microscope",
    category: "Microscopy",
    model: "FE-SEM Supra 55 (Carl Zeiss, Germany)",
    features: [
      "GEMINI Technology with high efficiency in-lens detector",
      "No magnetic field at specimen level",
      "Superb resolution and image quality at high and low operating voltages",
      "Extremely wide operating voltage range from 0.02-20kV",
      "Minimal adjustments required when changing operating conditions",
      "Short analytical working distance of 8.5 mm",
      "High probe current (up to 100 nA) with excellent stability (< 0.2%/h)",
      "Windows-based SmartSEM control software",
      "Integrated SE, InLens, and EDX detectors"
    ],
    applications: [
      "High-resolution imaging of nanostructures and nanomaterials",
      "Biological sample visualization with minimal preparation",
      "Surface topography analysis for microelectronics",
      "Elemental analysis and phase identification with EDX",
      "Contaminant detection and thin film analysis",
      "Atomic number contrast imaging",
      "Grain boundary and microstructural studies",
      "Catalysis research at nanoscale",
      "MEMS and NEMS device characterization",
      "Forensic trace evidence analysis",
      "Art conservation and archaeological studies"
    ],
    specifications: {
      resolution: "1.0 nm @ 20 kV, 1.7 nm @ 1 kV",
      magnification: "12× to 900,000×",
      voltage: "0.02 - 20 kV",
      probeCurrent: "Up to 100 nA",
      workingDistance: "8.5 mm (analytical)"
    },
    handledBy: "Mr. Kinny Pandey",
    email: "kinny@iiti.ac.in",
    image: "path/to/supra55-image.jpg"
  },
  {
    id: "gemini-360",
    name: "Gemini 360",
    fullName: "Advanced Field Emission Scanning Electron Microscope",
    category: "Microscopy",
    model: "Carl Zeiss Gemini 360",
    features: [
      "Next-generation GEMINI optics",
      "Ultra-high resolution imaging",
      "Advanced detector technology",
      "Automated imaging and analysis",
      "Low vacuum operation capability",
      "Enhanced analytical capabilities"
    ],
    applications: [
      "Ultra-high resolution materials characterization",
      "Advanced semiconductor inspection",
      "Nanomaterial analysis and development",
      "3D imaging and surface reconstruction",
      "Large-area automated imaging",
      "Failure analysis in advanced materials"
    ],
    specifications: {
      resolution: "Sub-nanometer capability",
      automation: "Advanced AI-assisted features",
      modes: "High vacuum, low vacuum"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/gemini360-image.jpg"
  },
  {
    id: "afm",
    name: "AFM",
    fullName: "Atomic Force Microscope",
    category: "Microscopy",
    model: "Atomic Force Microscope",
    features: [
      "Atomic-scale resolution imaging",
      "3D surface topography mapping",
      "Multiple imaging modes (contact, non-contact, tapping)",
      "Force measurements and spectroscopy",
      "Ambient and liquid environment operation",
      "Non-destructive surface analysis"
    ],
    applications: [
      "Nanoscale surface topography imaging",
      "Thin film thickness and roughness measurement",
      "Nanoparticle size and shape characterization",
      "Biological sample imaging in liquid",
      "Mechanical property measurements",
      "Electrical and magnetic property mapping",
      "Polymer surface characterization",
      "Nanolithography and manipulation"
    ],
    specifications: {
      resolution: "< 1 nm vertical, < 5 nm lateral",
      scanRange: "Up to 100 µm × 100 µm",
      modes: "Contact, tapping, phase imaging"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/afm-image.jpg"
  },
  {
    id: "clsm",
    name: "CLSM",
    fullName: "Confocal Laser Scanning Microscope",
    category: "Microscopy",
    model: "Confocal Laser Scanning Microscope",
    features: [
      "High-resolution 3D imaging",
      "Optical sectioning capability",
      "Multiple laser wavelengths",
      "Fluorescence imaging with multiple channels",
      "Live cell imaging capability",
      "Z-stack and time-lapse imaging"
    ],
    applications: [
      "3D reconstruction of biological specimens",
      "Live cell imaging and dynamics",
      "Fluorescence microscopy of labeled samples",
      "Co-localization studies",
      "Tissue section analysis",
      "Polymer and material surface imaging",
      "Biofilm structure analysis",
      "Neuronal network visualization"
    ],
    specifications: {
      resolution: "Optical diffraction limit (~200 nm lateral)",
      lasers: "Multiple wavelengths (405-633 nm typical)",
      objectives: "10× to 100× (oil/water immersion)"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/clsm-image.jpg"
  },

  // ==================== SPECTROSCOPY ====================
  {
    id: "nmr-500",
    name: "NMR 500",
    fullName: "500 MHz Nuclear Magnetic Resonance Spectrometer",
    category: "Spectroscopy",
    model: "500 MHz NMR Spectrometer",
    features: [
      "500 MHz proton frequency",
      "High-resolution multinuclear capability",
      "Advanced pulse sequences",
      "Variable temperature control",
      "Automatic sample changer (optional)",
      "2D and 3D NMR experiments"
    ],
    applications: [
      "Structure elucidation of organic compounds",
      "Protein and nucleic acid structure determination",
      "Reaction monitoring and kinetic studies",
      "Purity and quality control analysis",
      "Polymer characterization",
      "Metabolomics and mixture analysis",
      "Drug discovery and development",
      "Material science studies"
    ],
    specifications: {
      frequency: "500 MHz (¹H)",
      nuclei: "¹H, ¹³C, ¹⁵N, ¹⁹F, ³¹P and others",
      temperature: "-150°C to +150°C"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/nmr500-image.jpg"
  },
  {
    id: "nmr-400",
    name: "NMR 400",
    fullName: "400 MHz Nuclear Magnetic Resonance Spectrometer",
    category: "Spectroscopy",
    model: "400 MHz NMR Spectrometer",
    features: [
      "400 MHz proton frequency",
      "Multinuclear observation",
      "Standard 1D and 2D experiments",
      "Variable temperature capability",
      "User-friendly automation",
      "Routine structural analysis"
    ],
    applications: [
      "Organic compound characterization",
      "Small molecule structure determination",
      "Quantitative NMR analysis",
      "Teaching and training applications",
      "Quality control in synthesis",
      "Natural product analysis"
    ],
    specifications: {
      frequency: "400 MHz (¹H)",
      nuclei: "¹H, ¹³C, ¹⁹F, ³¹P",
      sampleSize: "Standard 5 mm tubes"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/nmr400-image.jpg"
  },
  {
    id: "ft-ir",
    name: "FT-IR",
    fullName: "Fourier Transform Infrared Spectroscopy",
    category: "Spectroscopy",
    model: "Fourier Transform Infrared Spectrometer",
    features: [
      "Wide spectral range (4000-400 cm⁻¹)",
      "High resolution and sensitivity",
      "ATR (Attenuated Total Reflectance) accessory",
      "Transmission and reflection modes",
      "Minimal sample preparation",
      "Rapid analysis capability"
    ],
    applications: [
      "Functional group identification",
      "Compound identification and verification",
      "Quality control and assurance",
      "Polymer characterization",
      "Pharmaceutical analysis",
      "Environmental sample analysis",
      "Surface coating analysis",
      "Forensic investigations"
    ],
    specifications: {
      range: "4000-400 cm⁻¹",
      resolution: "< 0.5 cm⁻¹",
      modes: "Transmission, ATR, reflection"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/ftir-image.jpg"
  },
  {
    id: "tcspc",
    name: "TCSPC",
    fullName: "Time-Correlated Single Photon Counting",
    category: "Spectroscopy",
    model: "Time-Correlated Single Photon Counting System",
    features: [
      "Picosecond time resolution",
      "High sensitivity detection",
      "Fluorescence lifetime measurement",
      "Time-resolved spectroscopy",
      "Multiple excitation wavelengths",
      "Advanced data analysis software"
    ],
    applications: [
      "Fluorescence lifetime imaging (FLIM)",
      "Time-resolved emission spectroscopy",
      "Photophysical studies of molecules",
      "Protein dynamics and interactions",
      "FRET (Förster Resonance Energy Transfer) studies",
      "Semiconductor characterization",
      "Single molecule detection",
      "Quantum dot studies"
    ],
    specifications: {
      timeResolution: "< 25 ps",
      wavelength: "UV to NIR",
      detectors: "PMT, SPAD, MCP-PMT"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/tcspc-image.jpg"
  },
  {
    id: "cd",
    name: "CD",
    fullName: "Circular Dichroism Spectroscopy",
    category: "Spectroscopy",
    model: "Circular Dichroism Spectrometer",
    features: [
      "UV to visible wavelength range",
      "Temperature-controlled measurements",
      "Rapid spectral acquisition",
      "High sensitivity and low noise",
      "Protein secondary structure analysis",
      "Kinetic measurements capability"
    ],
    applications: [
      "Protein secondary structure determination",
      "DNA and RNA conformation studies",
      "Protein folding and stability studies",
      "Enzyme-substrate interactions",
      "Chiral molecule analysis",
      "Drug-protein binding studies",
      "Thermal and chemical denaturation studies"
    ],
    specifications: {
      wavelength: "190-900 nm",
      temperature: "-10°C to +110°C",
      sensitivity: "High ellipticity detection"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/cd-image.jpg"
  },
  {
    id: "uv-visible",
    name: "UV-Visible Spectrometer",
    fullName: "UV-Visible Absorption Spectroscopy",
    category: "Spectroscopy",
    model: "UV-Visible Absorption Spectrometer",
    features: [
      "190-1100 nm wavelength range",
      "Double beam optical system",
      "Fast scanning capability",
      "Temperature control",
      "Multiple cell holder",
      "Software for kinetics and quantitation"
    ],
    applications: [
      "Quantitative analysis of analytes",
      "Protein and nucleic acid concentration determination",
      "Enzyme kinetics studies",
      "Reaction monitoring",
      "Quality control in pharmaceuticals",
      "Environmental water analysis",
      "Nanoparticle characterization",
      "Band gap determination"
    ],
    specifications: {
      wavelength: "190-1100 nm",
      bandwidth: "< 2 nm",
      accuracy: "±0.3 nm"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/uvvis-image.jpg"
  },
  {
    id: "uv-vis-nir",
    name: "UV-VIS-NIR",
    fullName: "UV-Visible-Near Infrared Spectroscopy",
    category: "Spectroscopy",
    model: "UV-Visible-NIR Spectrometer",
    features: [
      "Extended wavelength range (190-3300 nm)",
      "High resolution in NIR region",
      "Integrating sphere for diffuse reflectance",
      "Temperature-controlled measurements",
      "Solid, liquid, and film sample analysis"
    ],
    applications: [
      "Optical property characterization",
      "Thin film analysis",
      "Semiconductor band gap determination",
      "Nanomaterial optical properties",
      "Solar cell material characterization",
      "Optical coating analysis",
      "Gemstone and mineral analysis"
    ],
    specifications: {
      wavelength: "190-3300 nm",
      modes: "Transmission, reflection, diffuse reflectance",
      detectors: "PMT and PbS"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/uvvisnir-image.jpg"
  },
  {
    id: "spectrofluorometer",
    name: "Spectrofluorometer",
    fullName: "Fluorescence Spectroscopy",
    category: "Spectroscopy",
    model: "Fluorescence Spectrometer",
    features: [
      "Excitation and emission scanning",
      "3D fluorescence mapping",
      "Quantum yield measurements",
      "Temperature control",
      "Solid and liquid sample holders",
      "Time-resolved capabilities (optional)"
    ],
    applications: [
      "Fluorescence emission and excitation spectra",
      "Quantum yield determination",
      "Fluorophore characterization",
      "Protein and enzyme studies",
      "DNA/RNA quantification",
      "Environmental monitoring",
      "Food quality analysis",
      "Pharmaceutical fluorescence studies"
    ],
    specifications: {
      excitation: "200-900 nm",
      emission: "200-900 nm",
      sensitivity: "High signal-to-noise ratio"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/fluorometer-image.jpg"
  },

  // ==================== CHROMATOGRAPHY ====================
  {
    id: "lc-hrms",
    name: "LC-HRMS",
    fullName: "Liquid Chromatography High Resolution Mass Spectrometry",
    category: "Chromatography",
    model: "LC-HRMS System",
    features: [
      "High mass resolution and accuracy",
      "ESI and APCI ionization sources",
      "Wide mass range coverage",
      "MS/MS capabilities",
      "Fast polarity switching",
      "Advanced data processing software"
    ],
    applications: [
      "Small molecule identification and quantification",
      "Metabolomics and lipidomics studies",
      "Protein and peptide analysis",
      "Drug metabolism studies",
      "Natural product characterization",
      "Environmental contaminant analysis",
      "Food safety testing",
      "Pharmaceutical impurity profiling"
    ],
    specifications: {
      resolution: "> 100,000 FWHM",
      massAccuracy: "< 2 ppm",
      massRange: "50-2000 m/z (extendable)"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/lchrms-image.jpg"
  },
  {
    id: "hplc-rp",
    name: "HPLC-RP",
    fullName: "High Performance Liquid Chromatography Reverse Phase",
    category: "Chromatography",
    model: "HPLC System with RP Column",
    features: [
      "Binary or quaternary pump system",
      "UV-Vis or PDA detector",
      "Autosampler for high throughput",
      "Column thermostat",
      "Method development software",
      "C18 and other RP columns"
    ],
    applications: [
      "Pharmaceutical analysis and quality control",
      "Natural product separation",
      "Peptide and protein purification",
      "Environmental sample analysis",
      "Food and beverage testing",
      "Chiral separations",
      "Impurity profiling"
    ],
    specifications: {
      flowRate: "0.001-10 mL/min",
      pressure: "Up to 600 bar",
      wavelength: "190-800 nm (UV-Vis)"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/hplc-image.jpg"
  },
  {
    id: "gc-ms",
    name: "GC-MS",
    fullName: "Gas Chromatography Mass Spectrometry",
    category: "Chromatography",
    model: "GC-MS System",
    features: [
      "Capillary column technology",
      "EI and CI ionization modes",
      "Automated injection systems",
      "Temperature programmable oven",
      "Spectral library matching",
      "SIM and SCAN modes"
    ],
    applications: [
      "Volatile organic compound analysis",
      "Environmental monitoring",
      "Forensic toxicology",
      "Food flavor and fragrance analysis",
      "Petrochemical analysis",
      "Drug testing and screening",
      "Pesticide residue analysis",
      "Metabolite profiling"
    ],
    specifications: {
      massRange: "1.6-1050 m/z",
      temperature: "Up to 450°C",
      sensitivity: "Picogram level"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/gcms-image.jpg"
  },

  // ==================== THERMAL ANALYSIS ====================
  {
    id: "tga",
    name: "TGA",
    fullName: "Thermogravimetric Analysis",
    category: "Thermal Analysis",
    model: "Thermogravimetric Analyzer",
    features: [
      "High-precision microbalance",
      "Wide temperature range",
      "Controlled atmosphere (N₂, air, O₂)",
      "Simultaneous TGA-DTA/DSC (optional)",
      "Automated sample loading",
      "Evolved gas analysis coupling"
    ],
    applications: [
      "Thermal stability determination",
      "Decomposition temperature analysis",
      "Moisture and volatile content",
      "Composition analysis of materials",
      "Oxidation and corrosion studies",
      "Polymer degradation studies",
      "Catalyst characterization",
      "Coal and fuel analysis"
    ],
    specifications: {
      temperature: "RT to 1600°C",
      balance: "0.1 µg sensitivity",
      atmosphere: "Inert, oxidative, or reducing"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/tga-image.jpg"
  },
  {
    id: "dsc",
    name: "DSC",
    fullName: "Differential Scanning Calorimetry",
    category: "Thermal Analysis",
    model: "Differential Scanning Calorimeter",
    features: [
      "Heat flow measurement",
      "Wide temperature range",
      "Cooling and heating modes",
      "Modulated DSC capability",
      "Autosampler option",
      "Precise temperature control"
    ],
    applications: [
      "Glass transition temperature (Tg) determination",
      "Melting and crystallization studies",
      "Polymorphism investigation",
      "Purity determination",
      "Reaction kinetics",
      "Thermal history analysis",
      "Drug formulation studies",
      "Material compatibility testing"
    ],
    specifications: {
      temperature: "-180°C to 725°C",
      sensitivity: "< 0.2 µW",
      scanRate: "0.01 to 500°C/min"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/dsc-image.jpg"
  },

  // ==================== SPECIALIZED EQUIPMENT ====================
  {
    id: "bet-surface-analyzer",
    name: "BET Surface Analyzer",
    fullName: "Brunauer-Emmett-Teller Surface Area Analysis",
    category: "Surface Analysis",
    model: "BET Surface Area Analyzer",
    features: [
      "N₂ physisorption at 77 K",
      "Multipoint BET analysis",
      "Pore size distribution",
      "BJH and t-plot methods",
      "Automated degassing station",
      "Low surface area capability"
    ],
    applications: [
      "Surface area determination",
      "Pore size and volume analysis",
      "Catalyst characterization",
      "Adsorbent material evaluation",
      "Powder and porous material analysis",
      "Nanomaterial surface characterization",
      "Quality control of materials"
    ],
    specifications: {
      surfaceArea: "0.01 m²/g minimum",
      poreSize: "0.35-500 nm",
      gas: "N₂, Ar, CO₂, Kr"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/bet-image.jpg"
  },
  {
    id: "microwave-reactor",
    name: "Microwave Reactor",
    fullName: "Microwave-Assisted Chemical Synthesis",
    category: "Chemical Synthesis",
    model: "Microwave Synthesis Reactor",
    features: [
      "Precise temperature and pressure control",
      "Rapid heating capability",
      "Multiple vessel positions",
      "IR temperature monitoring",
      "Stirring mechanisms",
      "Safety pressure monitoring"
    ],
    applications: [
      "Accelerated organic synthesis",
      "Nanoparticle synthesis",
      "Polymer chemistry",
      "Green chemistry applications",
      "Peptide synthesis",
      "Material synthesis and modification",
      "Extraction processes",
      "Digestion for analysis"
    ],
    specifications: {
      power: "0-1500 W",
      temperature: "Up to 300°C",
      pressure: "Up to 30 bar"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/microwave-image.jpg"
  },
  {
    id: "element-analyzer",
    name: "Element Analyzer",
    fullName: "CHNS/O Elemental Analysis",
    category: "Elemental Analysis",
    model: "CHN/CHNS/CHNSO Elemental Analyzer",
    features: [
      "Combustion method",
      "High precision and accuracy",
      "Solid and liquid sample capability",
      "Automated operation",
      "Micro-sample capability",
      "TCD detection"
    ],
    applications: [
      "Organic compound characterization",
      "Pharmaceutical quality control",
      "Environmental sample analysis",
      "Soil and agricultural analysis",
      "Polymer composition analysis",
      "Fuel and coal analysis",
      "Protein nitrogen content",
      "Research and development"
    ],
    specifications: {
      elements: "C, H, N, S, O",
      sampleSize: "0.1-30 mg",
      accuracy: "±0.3% absolute"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/element-analyzer-image.jpg"
  },
  {
    id: "milliq-di-water",
    name: "MilliQ DI Water",
    fullName: "Ultrapure Water System",
    category: "Water Purification",
    model: "Milli-Q Ultrapure Water System",
    features: [
      "Type 1 ultrapure water production",
      "18.2 MΩ·cm resistivity",
      "Multiple purification technologies",
      "Real-time quality monitoring",
      "UV sterilization",
      "Low TOC levels"
    ],
    applications: [
      "HPLC and UPLC mobile phases",
      "Molecular biology applications",
      "Cell culture preparation",
      "Buffer and reagent preparation",
      "Analytical instrument operations",
      "Sample dilutions",
      "Glassware rinsing"
    ],
    specifications: {
      resistivity: "18.2 MΩ·cm at 25°C",
      toc: "< 5 ppb",
      bacteria: "< 0.1 CFU/mL"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/milliq-image.jpg"
  },
  {
    id: "lyophilizer",
    name: "Lyophilizer",
    fullName: "Freeze Dryer for Sample Preservation",
    category: "Sample Preparation",
    model: "Freeze Dryer / Lyophilizer",
    features: [
      "Ultra-low temperature capability",
      "High vacuum system",
      "Multiple flask/vial capacity",
      "Automated cycle control",
      "Ice condenser",
      "Data logging and monitoring"
    ],
    applications: [
      "Pharmaceutical product preservation",
      "Biological sample preservation",
      "Protein and enzyme stabilization",
      "Vaccine and antibody storage preparation",
      "Food preservation and processing",
      "Nanomaterial drying",
      "Organic and inorganic sample drying",
      "Herbal extract preservation"
    ],
    specifications: {
      temperature: "Down to -80°C",
      vacuum: "< 0.1 mbar",
      capacity: "Multiple flask sizes"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/lyophilizer-image.jpg"
  },
  {
    id: "polarimeter",
    name: "Polarimeter",
    fullName: "Optical Rotation Measurement",
    category: "Optical Analysis",
    model: "Automatic Polarimeter",
    features: [
      "Automatic measurement",
      "Temperature control",
      "High precision rotation angle measurement",
      "Specific rotation calculation",
      "Multiple wavelength options",
      "Digital display and data output"
    ],
    applications: [
      "Chiral compound analysis",
      "Enantiomeric purity determination",
      "Sugar concentration measurement",
      "Pharmaceutical quality control",
      "Natural product characterization",
      "Amino acid analysis",
      "Essential oil analysis",
      "Regulatory compliance testing"
    ],
    specifications: {
      accuracy: "±0.002°",
      wavelength: "589 nm (sodium D-line), others available",
      temperature: "15-35°C with Peltier control"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/polarimeter-image.jpg"
  },
  {
    id: "rheometer",
    name: "Rheometer",
    fullName: "Rheological Property Analysis",
    category: "Material Testing",
    model: "Rotational Rheometer",
    features: [
      "Rotational and oscillatory measurements",
      "Wide range of viscosity measurement",
      "Temperature control system",
      "Multiple geometry options",
      "Shear rate and stress control",
      "Advanced software for data analysis"
    ],
    applications: [
      "Polymer melt and solution rheology",
      "Viscosity profiling of fluids",
      "Gel characterization",
      "Paint and coating flow properties",
      "Food texture analysis",
      "Pharmaceutical formulation testing",
      "Cosmetic product development",
      "Viscoelastic property determination"
    ],
    specifications: {
      viscosity: "0.1 mPa·s to 10⁷ Pa·s",
      temperature: "-40°C to 600°C",
      torque: "0.1 µNm to 200 mNm"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/rheometer-image.jpg"
  },
  {
    id: "ln2-plant",
    name: "LN2 Plant",
    fullName: "Liquid Nitrogen Production Plant",
    category: "Facility",
    model: "On-site Liquid Nitrogen Generator",
    features: [
      "Continuous LN2 production",
      "High purity nitrogen output",
      "Automated operation",
      "Storage tank integration",
      "Energy efficient design",
      "Safety monitoring systems"
    ],
    applications: [
      "Cryogenic cooling for experiments",
      "Sample preservation and storage",
      "Inert atmosphere provision",
      "Cryogenic grinding",
      "NMR and other instrument cooling",
      "Biological sample banking",
      "Material science research",
      "Vacuum systems purging"
    ],
    specifications: {
      production: "Varies by model",
      purity: "> 99.99%",
      temperature: "-196°C"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/ln2-image.jpg"
  },

  // ==================== CENTRE OF EXCELLENCE (ACR INITIATIVE) ====================
  {
    id: "icp-oes",
    name: "ICP-OES",
    fullName: "Inductively Coupled Plasma Optical Emission Spectroscopy",
    category: "Centre of Excellence",
    model: "ICP-OES Spectrometer",
    features: [
      "Simultaneous multi-element analysis",
      "High temperature plasma source (6000-8000 K)",
      "Wide linear dynamic range",
      "Low detection limits",
      "Radial and axial viewing",
      "Automated sample introduction"
    ],
    applications: [
      "Multi-element analysis in environmental samples",
      "Trace metal determination in water and soil",
      "Petroleum and fuel analysis",
      "Food and beverage testing",
      "Pharmaceutical elemental analysis",
      "Mining and metallurgy",
      "Quality control in manufacturing",
      "Agricultural sample analysis"
    ],
    specifications: {
      elements: "Most elements in periodic table",
      detectionLimit: "ppb to ppm range",
      wavelength: "165-900 nm"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/icpoes-image.jpg"
  },
  {
    id: "ft-ir-coe",
    name: "FT-IR (CoE)",
    fullName: "Fourier Transform Infrared Spectroscopy",
    category: "Centre of Excellence",
    model: "Advanced FT-IR Spectrometer",
    features: [
      "High sensitivity and resolution",
      "Multiple sampling accessories",
      "ATR, transmission, and reflection modes",
      "Microscope attachment option",
      "Gas cell capability",
      "Library search software"
    ],
    applications: [
      "Lubricant and oil analysis",
      "Polymer identification and characterization",
      "Additive and contaminant detection",
      "Coating and surface analysis",
      "Quality control in automotive fluids",
      "Petrochemical product testing",
      "Environmental monitoring",
      "Research and development"
    ],
    specifications: {
      range: "7800-350 cm⁻¹",
      resolution: "Better than 0.5 cm⁻¹",
      signalToNoise: "> 60,000:1"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/ftir-coe-image.jpg"
  },
  {
    id: "flash-point-tester",
    name: "Flash Point Tester",
    fullName: "Flash Point Determination Apparatus",
    category: "Centre of Excellence",
    model: "Automated Flash Point Tester",
    features: [
      "Automated test procedure",
      "Cleveland open cup or Pensky-Martens closed cup",
      "Temperature control and monitoring",
      "Safety features and compliance",
      "Digital display and data logging",
      "Multiple test methods"
    ],
    applications: [
      "Petroleum product safety testing",
      "Lubricant flash point determination",
      "Fuel quality assessment",
      "Paint and solvent testing",
      "Chemical safety evaluation",
      "Regulatory compliance testing",
      "Transportation safety classification",
      "Quality control in refineries"
    ],
    specifications: {
      range: "-30°C to 400°C (method dependent)",
      standards: "ASTM D92, D93, ISO standards",
      accuracy: "±2°C"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/flashpoint-image.jpg"
  },
  {
    id: "ak-viscometer",
    name: "AK Viscometer",
    fullName: "Kinematic Viscosity Measurement",
    category: "Centre of Excellence",
    model: "Automatic Kinematic Viscometer",
    features: [
      "Automated viscosity measurement",
      "Temperature-controlled bath",
      "Multiple capillary options",
      "Compliance with ASTM standards",
      "Precise timing mechanism",
      "Data management software"
    ],
    applications: [
      "Engine oil viscosity testing",
      "Lubricant characterization",
      "Fuel viscosity measurement",
      "Hydraulic fluid analysis",
      "Quality control in petroleum industry",
      "Biodiesel testing",
      "Polymer solution viscosity",
      "Research and development"
    ],
    specifications: {
      range: "0.5 to 20,000 mm²/s",
      temperature: "20°C to 150°C",
      standards: "ASTM D445, ISO 3104"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/ak-viscometer-image.jpg"
  },
  {
    id: "b-viscometer",
    name: "B Viscometer",
    fullName: "Brookfield Viscosity Measurement",
    category: "Centre of Excellence",
    model: "Brookfield Rotational Viscometer",
    features: [
      "Rotational viscosity measurement",
      "Multiple spindle configurations",
      "Wide viscosity range",
      "Temperature control capability",
      "Digital display",
      "Shear rate calculation"
    ],
    applications: [
      "Non-Newtonian fluid analysis",
      "Paint and coating viscosity",
      "Food product consistency testing",
      "Cosmetic formulation testing",
      "Pharmaceutical suspension analysis",
      "Polymer solution characterization",
      "Adhesive and sealant testing",
      "Quality control applications"
    ],
    specifications: {
      range: "15 to 13,000,000 cP",
      speed: "0.3 to 200 RPM",
      accuracy: "±1% of full scale range"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/b-viscometer-image.jpg"
  },
  {
    id: "millipore",
    name: "Millipore",
    fullName: "Water Purification System",
    category: "Centre of Excellence",
    model: "Millipore Water Purification System",
    features: [
      "Multi-stage purification process",
      "Type 1, 2, and 3 water production",
      "Real-time quality monitoring",
      "UV and ultrafiltration",
      "Point-of-use dispensing",
      "Low maintenance design"
    ],
    applications: [
      "Laboratory water for general use",
      "Buffer and reagent preparation",
      "Analytical chemistry applications",
      "Glassware washing",
      "Autoclave and sterilizer feed water",
      "Microbiology media preparation",
      "Histology and pathology",
      "Clinical diagnostic applications"
    ],
    specifications: {
      resistivity: "Up to 18.2 MΩ·cm",
      flowRate: "1-2 L/min",
      purification: "RO, EDI, UV, filtration"
    },
    handledBy: "Lab Coordinator",
    email: "contact@iiti.ac.in",
    image: "path/to/millipore-coe-image.jpg"
  }
];

// Helper functions for data manipulation
export const getInstrumentsByCategory = (category) => {
  return instrumentsData.filter(instrument => instrument.category === category);
};

export const getAllCategories = () => {
  return [...new Set(instrumentsData.map(instrument => instrument.category))];
};

export const getInstrumentById = (id) => {
  return instrumentsData.find(instrument => instrument.id === id);
};

export const searchInstruments = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return instrumentsData.filter(instrument =>
    instrument.name.toLowerCase().includes(term) ||
    instrument.fullName.toLowerCase().includes(term) ||
    instrument.model.toLowerCase().includes(term) ||
    instrument.category.toLowerCase().includes(term) ||
    instrument.applications.some(app => app.toLowerCase().includes(term)) ||
    instrument.features.some(feature => feature.toLowerCase().includes(term))
  );
};

// Category descriptions for better understanding
export const categoryDescriptions = {
  "X-Ray": "X-ray based analytical techniques for structural and elemental analysis",
  "Microscopy": "Advanced imaging techniques from nano to micro scale",
  "Spectroscopy": "Spectroscopic methods for molecular and atomic characterization",
  "Chromatography": "Separation and analysis techniques for complex mixtures",
  "Thermal Analysis": "Temperature-dependent property analysis of materials",
  "Surface Analysis": "Surface area, porosity, and adsorption characterization",
  "Chemical Synthesis": "Equipment for accelerated and controlled synthesis",
  "Elemental Analysis": "Quantitative determination of elemental composition",
  "Water Purification": "High-purity water production systems",
  "Sample Preparation": "Sample processing and preservation equipment",
  "Optical Analysis": "Optical property measurement instruments",
  "Material Testing": "Rheological and mechanical property analysis",
  "Facility": "Core facility infrastructure and utilities",
  "Centre of Excellence": "Specialized instruments for automotive and industrial applications"
};

export default instrumentsData;