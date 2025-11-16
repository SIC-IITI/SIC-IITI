// import React from 'react';
// import { Phone, Mail, MapPin } from 'lucide-react';

// const ContactPage = () => {
//   const departments = [
//     {
//       title: "Admissions Office",
//       head: "Dr. Academic Affairs",
//       phone: "+91-732-2438-701",
//       email: "admissions@iiti.ac.in",
//       color: "#6764D0"
//     },
//     {
//       title: "Academic Affairs",
//       head: "Dr. Student Welfare",
//       phone: "+91-732-2438-702",
//       email: "academics@iiti.ac.in",
//       color: "#FF6B6B"
//     },
//     {
//       title: "Student Affairs",
//       head: "Dr. Campus Life",
//       phone: "+91-732-2438-703",
//       email: "students@iiti.ac.in",
//       color: "#4ECDC4"
//     },
//     {
//       title: "Research & Development",
//       head: "Dr. Innovation Hub",
//       phone: "+91-732-2438-704",
//       email: "research@iiti.ac.in",
//       color: "#FFA726"
//     }
//   ];

//   const CalendarIcon = ({ color }) => (
//     <div
//       className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0  "
//       style={{ backgroundColor:'#6764D0' }}
//     >
//       <div className="relative w-7 h-7 border-2 border-white rounded">
//         <div className="absolute -top-1.5 left-1 w-0.5 h-2 bg-white "></div>
//         <div className="absolute -top-1.5 right-1 w-0.5 h-2 bg-white "></div>
//         <div className="absolute top-2.5 left-0 w-full h-0.5 bg-white"></div>
//         <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-white rounded"></div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen "
//     style={{backgroundColor: "#F5F5F5"}}
//     >
//       {/* Hero Section */}
//           <main className="bg-gray-50 py-16 text-center">
//         <h1 className="text-5xl font-bold tracking-wide mb-6">DEPARTMENT CONTACTS</h1>
//         <p className="text-xl text-gray-700 tracking-wide">
//           REACH OUT TO SPECIFIC DEPARTMENTS FOR TARGETED ASSISTANCE
//         </p>
//       </main>

//       {/* Department Cards */}
//       <section
//         className="py-20 px-6"
//         style={{ backgroundColor: '#c9fbffff' }}
//       >
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//           {departments.map((dept, index) => (
//             <div
//               key={index}
//               className=" p-8 flex items-start gap-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
//               style={{ backgroundColor: '#F5F5F5' }}
//             >
//               <CalendarIcon color={dept.color} />
//               <div className="flex-1">
//                 <h3 className="text-2xl font-bold mb-3 text-gray-900">{dept.title}</h3>
//                 <p className="text-gray-600 mb-4 text-lg font-medium">Head: {dept.head}</p>
//                 <div className="space-y-2">
//                   <a
//                     href={`tel:${dept.phone}`}
//                     className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors group"
//                   >
//                     <Phone size={18} className="text-purple-600 group-hover:scale-110 transition-transform" />
//                     <span>{dept.phone}</span>
//                   </a>
//                   <a
//                     href={`mailto:${dept.email}`}
//                     className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors group"
//                   >
//                     <Mail size={18} className="text-purple-600 group-hover:scale-110 transition-transform" />
//                     <span>{dept.email}</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// };

// export default ContactPage;
import React from 'react';
import { Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  const departments = [
    {
      title: "Admissions Office",
      head: "Dr. Academic Affairs",
      phone: "+91-732-2438-701",
      email: "admissions@iiti.ac.in"
    },
    {
      title: "Research Office",
      head: "Dr. Research Affairs",
      phone: "+91-732-2438-702",
      email: "research@iiti.ac.in"
    },
    {
      title: "Finance Office",
      head: "Dr. Finance Head",
      phone: "+91-732-2438-703",
      email: "finance@iiti.ac.in"
    },
    {
      title: "Student Affairs",
      head: "Dr. Student Welfare",
      phone: "+91-732-2438-704",
      email: "students@iiti.ac.in"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Hero Section */}
      <main className="h-[300px] bg-[#EDEEEE] flex flex-col items-center justify-center tracking-wide">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">DEPARTMENT CONTACTS</h1>
        <p className="text-xl text-gray-600">
          REACH OUT TO SPECIFIC DEPARTMENTS FOR TARGETED ASSISTANCE
        </p>
      </main>

      {/* Department Cards */}
      <div className="min-h-[500px] bg-[#ECEEF1] py-16 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-[#e6e7e8] p-6 flex items-center gap-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="w-[50px] h-[50px] bg-[#7A74E3] rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-7 h-7 border-2 border-white rounded-sm relative">
                  <div className="absolute top-[-6px] left-[3.5px] w-[6px] h-[8px] bg-white rounded-sm"></div>
                  <div className="absolute top-[-6px] right-[3.5px] w-[6px] h-[8px] bg-white rounded-sm"></div>
                  <div className="absolute top-[10px] left-0 w-full h-[1.5px] bg-white"></div>
                  <div className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 w-3 h-[2px] bg-white rounded-sm"></div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{dept.title}</h3>
                <p className="text-gray-700 mb-1">Head: {dept.head}</p>
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <Phone size={15} />
                  <span>{dept.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={15} />
                  <span>{dept.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}