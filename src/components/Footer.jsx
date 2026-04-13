import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

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
                  <p className="font-medium">Sophisticated Instrumentation Centre</p>
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
                <Mail className="w-5 h-5 flex-shrink-0 text-blue-300" />
                <div className="text-sm">
                  <p className="text-blue-200">sic@iiti.ac.in</p>
                  <p className="text-blue-200">managersic@iiti.ac.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/instruments"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Instruments
                </a>
              </li>
              <li>
                <a
                  href="https://sicbooking.iiti.ac.in/"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Book Now
                </a>
              </li>
              <li>
                <a
                  href="/outreach"
                  className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Outreach
                </a>
              </li>
            </ul>
            <div className="mt-4">
            <a
              href="https://www.iiti.ac.in"
              target="_blank"
              rel="noopener noreferrer"
                               className="text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"

            >
              IIT Indore Homepage
            </a>
</div>
          </div>

          {/* Map Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-100">SIC site map</h3>
            <div className="rounded-lg overflow-hidden border-2 border-blue-700 h-40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1095.7182177022667!2d75.92113631617562!3d22.521357539163045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962efca9295cb87%3A0x400d3f62307a32d1!2sSIC%20-%20A%20National%20Facility!5e0!3m2!1sen!2sin!4v1664003429130!5m2!1sen!2sin" // Note: This src URL looks like a placeholder
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
            © 2026 Sophisticated Instrumentation Centre, IIT Indore. All rights reserved.
          </p>
        </div>

      </div>
      <div className="mt-6 text-center">
  <p className="text-blue-200 text-sm mb-2">Visitors</p>

  <a
    href="https://www.hitwebcounter.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://hitwebcounter.com/counter/counter.php?page=21487857&style=0001&nbdigits=5&type=page&initCount=0"
      title="Visitor Counter"
      alt="Visitor Counter"
      className="mx-auto"
    />
  </a>
</div>
    </footer>
  );
}

export default Footer;
