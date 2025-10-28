// import React from 'react';
// import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// function Footer() {
//   return (
//     <footer className="bg-blue-900 text-white mt-16">
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid gap-8 md:grid-cols-4 mb-8">
//           {/* Contact Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-blue-100">Get in Touch</h3>
//             <div className="space-y-3">
//               <div className="flex gap-3">
//                 <MapPin className="w-5 h-5 flex-shrink-0 text-blue-300" />
//                 <div className="text-sm">
//                   <p className="font-medium">Sophisticated Instrumentation Center</p>
//                   <p className="text-blue-200">A National Facility</p>
//                   <p className="text-blue-200">Indian Institute of Technology Indore</p>
//                   <p className="text-blue-200">Khandwa Road, Simrol – 453552</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Phone Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-blue-100">Contact Information</h3>
//             <div className="space-y-3">
//               <div className="flex gap-3">
//                 <Phone className="w-5 h-5 flex-shrink-0 text-blue-300" />
//                 <div className="text-sm">
//                   <p className="font-medium">+91 (731) 660 3311</p>
//                   <p className="text-blue-200">Ext: 3311 / 3543 / 3541</p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <Mail className="w-5 h-5 flex-shrink-0 text-blue-300" />
//                 <div className="text-sm">
//                   <p className="text-blue-200">sic@iiti.ac.in</p>
//                   <p className="text-blue-200">managersic@iiti.ac.in</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Social Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-blue-100">Follow Us</h3>
//             <div className="flex gap-4">
//               <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600">
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600">
//                 <Linkedin className="w-5 h-5" />
//               </a>
//               <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600">
//                 <Instagram className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Map Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-blue-100">Find Us</h3>
//             <div className="rounded-lg overflow-hidden border-2 border-blue-700 h-40">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.3456789!2d75.9040!3d22.2883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630f6b4b4b4b4b%3A0x4b4b4b4b4b4b4b4b!2sIndian%20Institute%20of%20Technology%20Indore!5e0!3m2!1sen!2sin!4v1234567890"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//               ></iframe>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-blue-700 pt-6">
//           <p className="text-center text-blue-200 text-sm">
//             © 2024 Sophisticated Instrumentation Center, IIT Indore. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import React from "react";
import { Instagram, Linkedin, Youtube, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* SIC Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">SIC - IIT Indore</h3>
            <p className="text-blue-100 leading-relaxed text-sm">
              Empowering students with knowledge, innovation, and excellence at
              one of India's premier technical institutions.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Academics Column 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Academics</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Programs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Faculty
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  SIC Committee
                </a>
              </li>
            </ul>
          </div>

          {/* Academics Column 2 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Academics</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Programs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Faculty
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  SIC Committee
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-3 text-blue-100 text-sm">
              <p className="font-semibold text-white">
                Indian Institute of Technology Indore
              </p>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <p>
                  Khandwa Road, Simrol
                  <br />
                  Indore - 453552, Madhya Pradesh
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href="mailto:sic@iiti.ac.in"
                  className="hover:text-white transition-colors"
                >
                  sic@iiti.ac.in
                </a>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Location</h3>
            <div className="rounded-lg overflow-hidden border-2 border-white/20 shadow-lg h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.592692190366!2d75.9190039449008!3d22.521487893472603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962efca9295cb87%3A0x400d3f62307a32d1!2sSIC%20-%20A%20National%20Facility%20of%20IIT%20Indore%20(MP)!5e0!3m2!1sen!2sin!4v1761643673272!5m2!1sen!2sin"
                width="600"
                height="450"
                    style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="IIT Indore Map"
              ></iframe>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-blue-100 text-sm flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-block w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">
              ©
            </span>
            2025 Sophisticated Instrumentation Center, IIT Indore. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
