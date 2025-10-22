import { X, Mail, User, MapPin, Package, Microscope } from 'lucide-react';

export default function InstrumentModal({ instrument, onClose }) {
  if (!instrument) return null;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in-use':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{instrument.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="p-6">
            <div className="mb-6">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                {instrument.image_url ? (
                  <img
                    src={instrument.image_url}
                    alt={instrument.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <Microscope className="w-32 h-32 text-blue-600" />
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {instrument.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(instrument.availability_status)}`}>
                  {instrument.availability_status}
                </span>
              </div>
            </div>

            {(instrument.manufacturer || instrument.model_number) && (
              <div className="mb-6 flex items-center gap-2 text-gray-700">
                <Package className="w-5 h-5 text-gray-500" />
                <span className="font-medium">
                  {instrument.manufacturer}
                  {instrument.model_number && ` - Model: ${instrument.model_number}`}
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{instrument.description}</p>
            </div>

            {instrument.detailed_specs && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Specifications</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {instrument.detailed_specs}
                  </p>
                </div>
              </div>
            )}

            {instrument.applications && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Applications</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {instrument.applications}
                  </p>
                </div>
              </div>
            )}

            {instrument.location && (
              <div className="mb-6 flex items-start gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-medium">Location: </span>
                  {instrument.location}
                </div>
              </div>
            )}

            {(instrument.contact_person || instrument.contact_email) && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {instrument.contact_person && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-5 h-5 text-gray-500" />
                      <span>{instrument.contact_person}</span>
                    </div>
                  )}
                  {instrument.contact_email && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <a
                        href={`mailto:${instrument.contact_email}`}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {instrument.contact_email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <button
            // onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
