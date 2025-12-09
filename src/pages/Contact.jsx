
// import React from 'react';
// import { Phone, Mail } from 'lucide-react';

// export default function ContactPage() {
//   const departments = [
//     {
//       title: "Admissions Office",
//       head: "Dr. Academic Affairs",
//       phone: "+91-732-2438-701",
//       email: "admissions@iiti.ac.in"
//     },
//     {
//       title: "Research Office",
//       head: "Dr. Research Affairs",
//       phone: "+91-732-2438-702",
//       email: "research@iiti.ac.in"
//     },
//     {
//       title: "Finance Office",
//       head: "Dr. Finance Head",
//       phone: "+91-732-2438-703",
//       email: "finance@iiti.ac.in"
//     },
//     {
//       title: "Student Affairs",
//       head: "Dr. Student Welfare",
//       phone: "+91-732-2438-704",
//       email: "students@iiti.ac.in"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">


//       {/* Hero Section */}
//       <main className="h-[300px] bg-[#EDEEEE] flex flex-col items-center justify-center tracking-wide">
//         <h1 className="text-5xl font-bold text-gray-800 mb-4">DEPARTMENT CONTACTS</h1>
//         <p className="text-xl text-gray-600">
//           REACH OUT TO SPECIFIC DEPARTMENTS FOR TARGETED ASSISTANCE
//         </p>
//       </main>

//       {/* Department Cards */}
//       <div className="min-h-[500px] bg-[#ECEEF1] py-16 px-8">
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
//           {departments.map((dept, index) => (
//             <div
//               key={index}
//               className="bg-[#e6e7e8] p-6 flex items-center gap-4 rounded-lg shadow-sm hover:shadow-md transition"
//             >
//               <div className="w-[50px] h-[50px] bg-[#7A74E3] rounded-full flex items-center justify-center flex-shrink-0">
//                 <div className="w-7 h-7 border-2 border-white rounded-sm relative">
//                   <div className="absolute top-[-6px] left-[3.5px] w-[6px] h-[8px] bg-white rounded-sm"></div>
//                   <div className="absolute top-[-6px] right-[3.5px] w-[6px] h-[8px] bg-white rounded-sm"></div>
//                   <div className="absolute top-[10px] left-0 w-full h-[1.5px] bg-white"></div>
//                   <div className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 w-3 h-[2px] bg-white rounded-sm"></div>
//                 </div>
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">{dept.title}</h3>
//                 <p className="text-gray-700 mb-1">Head: {dept.head}</p>
//                 <div className="flex items-center gap-2 text-gray-700 mb-1">
//                   <Phone size={15} />
//                   <span>{dept.phone}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-700">
//                   <Mail size={15} />
//                   <span>{dept.email}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }
import React, { useState } from 'react';
import { Phone, Mail, Calendar } from 'lucide-react';

export default function ContactPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const departments = [
    {
      title: "Admissions Office",
      head: "Dr. Academic Affairs",
      phone: "+91-732-2438-701",
      email: "admissions@iiti.ac.in",
      icon: Calendar
    },
    {
      title: "Research Office",
      head: "Dr. Research Affairs",
      phone: "+91-732-2438-702",
      email: "research@iiti.ac.in",
      icon: Calendar
    },
    {
      title: "Finance Office",
      head: "Dr. Finance Head",
      phone: "+91-732-2438-703",
      email: "finance@iiti.ac.in",
      icon: Calendar
    },
    {
      title: "Student Affairs",
      head: "Dr. Student Welfare",
      phone: "+91-732-2438-704",
      email: "students@iiti.ac.in",
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }
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
          DEPARTMENT CONTACTS
        </h1>
        <p className="text-sm md:text-xl text-gray-600 animate-fade-in-delay">
          REACH OUT TO SPECIFIC DEPARTMENTS FOR TARGETED ASSISTANCE
        </p>
      </div>

      {/* Department Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl hover:shadow-gray-400/20 transition-all duration-500 hover:-translate-y-2 hover:border-gray-400 animate-slide-up relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-black`}>
                  <dept.icon className={`w-6 h-6 text-gray-700 transition-colors duration-500 group-hover:text-white`} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-black">
                  {dept.title}
                </h3>
                <p className="text-gray-600 mb-6 transition-all duration-300 group-hover:text-gray-700">
                  Head: {dept.head}
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${dept.phone}`}
                    className="flex items-center gap-2 text-gray-900 hover:text-black transition-all duration-300 group/link"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover/link:scale-110 group-hover/link:-rotate-12" />
                    <span className="text-sm font-medium border-b border-gray-900 group-hover/link:border-black transition-all duration-300 group-hover/link:translate-x-1">
                      {dept.phone}
                    </span>
                  </a>
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-2 text-gray-900 hover:text-black transition-all duration-300 group/link"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover/link:scale-110 group-hover/link:rotate-12" />
                    <span className="text-sm font-medium border-b border-gray-900 group-hover/link:border-black transition-all duration-300 group-hover/link:translate-x-1">
                      {dept.email}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}