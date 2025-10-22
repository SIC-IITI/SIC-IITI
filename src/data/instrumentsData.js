// src/data/instrumentsData.js
const instrumentsData = [
  {
    id: 1,
    name: 'Scanning Electron Microscope',
    category: 'Microscopy',
    manufacturer: 'JEOL', 
    model_number: 'JSM-7610F',
    description: 'High-resolution field emission scanning electron microscope for nanoscale imaging and analysis.',
    detailed_specs: 'Resolution: 1.0 nm at 15 kVMagnification: 25× to 1,000,000×Accelerating Voltage: 0.01 to 30 kVDetectors: SE, BSE, EDXSample Size: Up to 200 mm diameter',
    applications: 'Surface morphology analysisNanoparticle characterizationMaterial science researchBiological sample imagingFailure analysis',
    location: 'Building A, Room 101',
    image_url: '/Instruments/Scanning_Electron_Microscope.png',
    availability_status: 'available',
    contact_person: 'Dr. Sarah Johnson',
    contact_email: 'sarah.johnson@institute.edu'
  },
  {
    id: 2,
    name: 'X-Ray Diffractometer',
    category: 'Spectroscopy',
    manufacturer: 'Bruker', 
    model_number: 'D8 Advance',
    description: 'Advanced X-ray diffraction system for crystal structure determination and phase analysis.',
    detailed_specs: 'Radiation Source: Cu KαGoniometer Radius: 280 mm2θ Range: -110° to 168°Resolution: 0.0001°Detector: LYNXEYE XE-T',
    applications: 'Crystal structure analysisPhase identificationCrystallite size determinationTexture analysisThin film characterization',
    location: 'Building A, Room 205',
    image_url: '/Instruments/X-Ray_Diffractometer.png',
    availability_status: 'available',
    contact_person: 'Dr. Michael Chen',
    contact_email: 'michael.chen@institute.edu'
  }
];

export default instrumentsData;
