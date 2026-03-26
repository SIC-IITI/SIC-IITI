import React, { useState } from 'react';
import { Phone, Mail, Calendar, Wrench } from 'lucide-react'; 

export default function ContactPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const contacts = [
    {
      title: "Professor In-charge, SIC",
      head: "Apurba K Das",
      phone: "N/A", 
      email: "head-sic@iiti.ac.in",
      icon: Calendar,
      fullRow: true 
    },
    {
      title: "Technical Help",
      head: "Ghanashyam Bhavsar",
      phone: "N/A", 
      email: "ghanashyam@iiti.ac.in",
      icon: Calendar,
      instruments: ["LC-HRMS", "GC-MS" , "HPLC-RP" , "HPLC-PREP" , "HPLC-Chiral" , "TGA" , "DSC" , "CHNS Analyzer"] 
    },
    {
      title: "Technical Help",
      head: "Kinny Pandey",
      phone: "N/A", 
      email: "kinny@iiti.ac.in",
      icon: Calendar,
      instruments: ["NMR-500","NMR-400" , "FE-SEM" , "SC-XRD" , "BET" , "Circular Dichroism" , "Fluorimeter" , "Rheometer", "AFM"] 
    },
    {
      title: "Administrative Help", 
      head: "Mr. Ranjeet Raghuwanshi",
      phone: "N/A", 
      email: "managersic@iiti.ac.in",
      icon: Calendar,
      fullRow: true // Added this line to center the 4th card
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.8s ease-out 0.2s both; }
        .animate-slide-up { animation: slide-up 0.6s ease-out both; }
      `}</style>

      {/* Hero Section */}
      <div className="text-center py-20 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 transform rotate-12 hover:rotate-0 transition-transform duration-500 hover:scale-110">
          <div className="transform -rotate-12">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="animate-pulse">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in">
          NEED HELP?
        </h1>
        <p className="text-sm md:text-xl text-gray-600 animate-fade-in-delay">
         PLEASE REACH OUT US AS UNDER!
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl hover:shadow-gray-400/20 transition-all duration-500 hover:-translate-y-2 hover:border-gray-400 animate-slide-up relative overflow-hidden group ${contact.fullRow ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-black">
                    {contact.title}
                  </h3>
                  <p className="text-gray-600 mb-6 transition-all duration-300 group-hover:text-gray-700">
                    {contact.head}
                  </p>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  {contact.phone !== "N/A" && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-gray-900 hover:text-black transition-all duration-300 group/link"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover/link:scale-110 group-hover/link:-rotate-12" />
                      <span className="text-sm font-medium border-b border-gray-900 group-hover/link:border-black transition-all duration-300 group-hover/link:translate-x-1">
                        {contact.phone}
                      </span>
                    </a>
                  )}
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-gray-900 hover:text-black transition-all duration-300 group/link"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover/link:scale-110 group-hover/link:rotate-12" />
                    <span className="text-sm font-medium border-b border-gray-900 group-hover/link:border-black transition-all duration-300 group-hover/link:translate-x-1">
                      {contact.email}
                    </span>
                  </a>
                </div>

                {contact.instruments && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-3 text-gray-700">
                      <Wrench className="w-4 h-4" />
                      <span className="text-sm font-semibold">Instruments</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {contact.instruments.map((instrument, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors duration-300 group-hover:border-gray-300 group-hover:bg-white"
                        >
                          {instrument}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}