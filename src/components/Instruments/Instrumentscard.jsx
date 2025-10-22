import { Microscope, MapPin, CheckCircle, Clock, Wrench, ArrowRight } from 'lucide-react';

export default function InstrumentCard({ instrument, onViewDetails }) {
  const getStatusInfo = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return {
          color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          icon: CheckCircle,
          label: 'Available'
        };
      case 'in-use':
        return {
          color: 'bg-amber-100 text-amber-700 border-amber-200',
          icon: Clock,
          label: 'In Use'
        };
      case 'maintenance':
        return {
          color: 'bg-rose-100 text-rose-700 border-rose-200',
          icon: Wrench,
          label: 'Maintenance'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: Clock,
          label: status
        };
    }
  };

  const statusInfo = getStatusInfo(instrument.availability_status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <div className="relative h-56 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 flex items-center justify-center overflow-hidden">
        {instrument.image_url ? (
          <img
            src={instrument.image_url}
            alt={instrument.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <Microscope className="w-24 h-24 text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${statusInfo.color}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {statusInfo.label}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
            {instrument.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {instrument.name}
        </h3>

        {instrument.manufacturer && (
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              {instrument.manufacturer}
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-gray-200 to-transparent"></div>
          </div>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {instrument.description}
        </p>

        {instrument.location && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-5 p-2 bg-gray-50 rounded-lg">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{instrument.location}</span>
          </div>
        )}

        <button
          onClick={() => onViewDetails(instrument)}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-md hover:shadow-xl"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
