import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-100">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 text-blue-300" />
                <div className="text-sm">
                  <p className="font-medium">Sophisticated Instrumentation Center</p>
                  <p className="text-blue-200">A National Facility</p>
                  <p className="text-blue-200">Indian Institute of Technology Indore</p>
                  <p className="text-blue-200">Khandwa Road, Simrol – 453552</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-100">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-blue-300" />
                <div className="text-sm">
                  <p className="font-medium">+91 (731) 660 3311</p>
                  <p className="text-blue-200">Ext: 3311 / 3543 / 3541</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-blue-300" />
                <div className="text-sm">
                  <p className="text-blue-200">sic@iiti.ac.in</p>
                  <p className="text-blue-200">managersic@iiti.ac.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-100">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-100">Find Us</h3>
            <div className="rounded-lg overflow-hidden border-2 border-blue-700 h-40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1095.7182177022667!2d75.92113631617562!3d22.521357539163045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962efca9295cb87%3A0x400d3f62307a32d1!2sSIC%20-%20A%20National%20Facility!5e0!3m2!1sen!2sin!4v1664003429130!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 pt-6">
          <p className="text-center text-blue-200 text-sm">
            © 2024 Sophisticated Instrumentation Center, IIT Indore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
