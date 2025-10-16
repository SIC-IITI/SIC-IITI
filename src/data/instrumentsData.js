// src/data/instrumentsData.js
const instrumentsData = {
  //X-Ray Techniques
  scxrd: {
    id: "scxrd",
    name: "Single Crystal XRD (SCXRD)",
    organization: "SIC - IIT Indore",
    model: "Agilent Super Nova CCD System",
    features: [
      "Micro-focus Cu and Mo sources",
      "Temperature range 90–400K",
      "High-definition crystal imaging",
    ],
    applications: [
      "Crystal structure refinement",
      "Lattice parameter determination",
      "X-ray diffraction studies",
    ],
    pricing: {
      internal: { category: "Internal Users", price: "Free", description: "IIT Indore Users" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Mr. Kinny Pandey", email: "kinny@iiti.ac.in" },
    images: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800",
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    ],
  },

  edx: {
    id: "edx",
    name: "Energy Dispersive X-Ray Spectroscopy (EDS/EDX)",
    organization: "SIC - IIT Indore",
    model: "Oxford X-Max 80mm²",
    features: ["Elemental mapping", "Fast X-ray detection", "Quantitative microanalysis"],
    applications: ["Material composition", "Phase identification", "Impurity analysis"],
    pricing: {
      internal: { category: "Internal Users", price: "Free" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. A. Sharma", email: "asharma@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1581091012184-5c1d7b1a9d63?w=800"],
  },

  bse: {
    id: "bse",
    name: "Backscattered Electron Detector (BSE/BSD)",
    organization: "SIC - IIT Indore",
    model: "JEOL JSM-7610F Plus",
    features: ["High contrast imaging", "Phase detection", "Atomic number contrast"],
    applications: ["Phase mapping", "Alloy contrast imaging", "Mineralogical studies"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
     "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Ms. Nidhi Verma", email: "nverma@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800"],
  },

  //Microscopy
  sem: {
    id: "sem",
    name: "Scanning Electron Microscope (FE-SEM)",
    organization: "SIC - IIT Indore",
    model: "FEI Nova NanoSEM 450",
    features: ["High-resolution imaging", "Variable pressure", "EDS compatible"],
    applications: ["Surface morphology", "Nanostructure imaging"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. R. Joshi", email: "rjoshi@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800"],
  },

  clsm: {
    id: "clsm",
    name: "Confocal Laser Scanning Microscope (CLSM)",
    organization: "SIC - IIT Indore",
    model: "Leica TCS SP8",
    features: ["3D optical sectioning", "Multiple laser excitation"],
    applications: ["Fluorescence imaging", "Cell morphology"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Ms. Priya Rao", email: "prao@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800"],
  },

  afm: {
    id: "afm",
    name: "Atomic Force Microscope (AFM)",
    organization: "SIC - IIT Indore",
    model: "Bruker Dimension Icon",
    features: ["Nanoscale topography", "Force spectroscopy"],
    applications: ["Nanostructure analysis", "Film roughness"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
    "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Mr. Arjun Patel", email: "apatel@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800"],
  },

  tirfm: {
    id: "tirfm",
    name: "Single Molecule Microscope (TIRFM)",
    organization: "SIC - IIT Indore",
    model: "Nikon Ti2 TIRF",
    features: ["Single-molecule sensitivity", "Fluorescence excitation"],
    applications: ["Molecular interaction studies", "Biophysical imaging"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. Meera S.", email: "meera@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800"],
  },

  //Spectroscopy
  nmr: {
    id: "nmr",
    name: "Nuclear Magnetic Resonance (NMR)",
    organization: "SIC - IIT Indore",
    model: "Bruker Avance 400 MHz",
    features: ["1H, 13C, 31P nuclei support", "Variable temperature"],
    applications: ["Molecular structure", "Dynamics analysis"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. R. Kumar", email: "rkumar@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1507914372368-b2b085b925a1?w=800"],
  },

  ftir: {
    id: "ftir",
    name: "Fourier Transform Infrared Spectrometer (FT-IR)",
    organization: "SIC - IIT Indore",
    model: "PerkinElmer Spectrum 100",
    features: ["ATR mode", "Wide range detectors"],
    applications: ["Functional group identification", "Organic compound study"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. S. Patel", email: "spatel@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800"],
  },

  cd: {
    id: "cd",
    name: "Circular Dichroism (CD)",
    organization: "SIC - IIT Indore",
    model: "Jasco J-1500",
    features: ["Chiral molecule analysis", "Protein secondary structure"],
    applications: ["Protein folding", "Chiral studies"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
     "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. R. Mehta", email: "rmehta@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1581091215367-59a9ce9f99f3?w=800"],
  },

  uvvis: {
    id: "uvvis",
    name: "UV-Visible Spectrometer (UV-VIS)",
    organization: "SIC - IIT Indore",
    model: "Shimadzu UV-2600",
    features: ["Optical absorption", "Transmission measurement"],
    applications: ["Optical material analysis", "Solution concentration study"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
     "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Mr. A. Gupta", email: "agupta@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1581091012184-5c1d7b1a9d63?w=800"],
  },

  nir: {
    id: "nir",
    name: "UV-Visible Spectrometer (NIR)",
    organization: "SIC - IIT Indore",
    model: "PerkinElmer Lambda 1050",
    features: ["Near-infrared spectroscopy", "High-sensitivity detectors"],
    applications: ["Material analysis", "Coating characterization"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
     "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Ms. Anjali Rao", email: "arao@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800"],
  },

  sf: {
    id: "sf",
    name: "Spectro Fluorometer (SF)",
    organization: "SIC - IIT Indore",
    model: "Horiba FluoroMax-4",
    features: ["Fluorescence and phosphorescence detection"],
    applications: ["Photoluminescence studies", "Molecular spectroscopy"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. K. Desai", email: "kdesai@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1581091215367-59a9ce9f99f3?w=800"],
  },

  //Chromatography
  ms: {
    id: "ms",
    name: "Mass Spectrometry (MS)",
    organization: "SIC - IIT Indore",
    model: "Agilent 5977B GC/MSD",
    features: ["Mass analysis", "Ion detection"],
    applications: ["Molecular weight determination", "Sample purity"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
     "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. P. Nair", email: "pnair@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1603126857171-6a1d59cfb6c1?w=800"],
  },

  hrms: {
    id: "hrms",
    name: "High Resolution Mass Spectrometry (HRMS)",
    organization: "SIC - IIT Indore",
    model: "Bruker Impact II",
    features: ["Accurate mass determination", "High sensitivity"],
    applications: ["Elemental composition", "Molecular formula confirmation"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
     "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. R. Das", email: "rdas@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1603126857171-6a1d59cfb6c1?w=800"],
  },

  lcms: {
    id: "lcms",
    name: "Liquid Chromatography Mass Spectrometry (LCMS)",
    organization: "SIC - IIT Indore",
    model: "Agilent 6460 Triple Quadrupole",
    features: ["Separation and identification", "Quantitative analysis"],
    applications: ["Complex mixture analysis", "Pharmaceutical testing"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. A. Jain", email: "ajain@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1581091012184-5c1d7b1a9d63?w=800"],
  },

  hplc: {
    id: "hplc",
    name: "High Performance Liquid Chromatography (RP-HPLC)",
    organization: "SIC - IIT Indore",
    model: "Waters Alliance 2695",
    features: ["Quantitative analysis", "Gradient control"],
    applications: ["Compound separation", "Purity testing"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
      "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. M. Patel", email: "mpatel@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1603126857171-6a1d59cfb6c1?w=800"],
  },

  gcms: {
    id: "gcms",
    name: "Gas Chromatography-Mass Spectrometry (GCMS)",
    organization: "SIC - IIT Indore",
    model: "Shimadzu GCMS-QP2020",
    features: ["Volatile compound analysis", "Automatic sample injection"],
    applications: ["Gas phase compound identification", "Environmental testing"],
    pricing: {
      internal: { category: "Internal", price: "Free" },
       "external": [
    {
      "category": "External Academic Institution",
      "price": "₹2,500",
      "unit": "per sample"
    },
    {
      "category": "Industries User",
      "price": "₹8,000",
      "unit": "per sample"
    },]
    },
    handler: { name: "Dr. T. Khan", email: "tkhan@iiti.ac.in" },
    images: ["https://images.unsplash.com/photo-1603126857171-6a1d59cfb6c1?w=800"],
  },
};

export default instrumentsData;
