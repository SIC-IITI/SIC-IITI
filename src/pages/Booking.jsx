import React from "react";

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Facility Booking
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
            Select your user category to proceed with booking. Each instrument
            requires a separate request submission.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto -mt-16">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Internal Users */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-10 border border-gray-100 flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Internal Users
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
                For IIT Indore students, faculty, and staff. Use your official
                institute credentials to access the internal booking system.
              </p>
              <a
                href="https://sicbooking.iiti.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Access SIC Portal
              </a>
            </div>

            {/* External Users */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-10 border border-gray-100 flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                External Users
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
                For users from external institutions, industries, and research
                organizations. All bookings are processed through the national
                iSTEM portal.
              </p>
              <a
                href="https://www.istem.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
               className="w-full text-center py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Go to iSTEM Portal
              </a>
            </div>

          </div>

          {/* Note Section */}
          <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-gray-700 text-lg leading-relaxed">
              <span className="font-semibold text-gray-900">
                Note for External Users:
              </span>{" "}
              Register on the I-STEM portal to access IIT Indore facilities.
            </p>
            <a
              href="https://www.istem.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block  text-blue-600 font-medium hover:underline"
            > https://www.istem.gov.in/
            </a>
            <p className="text-gray-700 text-lg leading-relaxed">
              
              For any query related to I-STEM reg, contact 18004253281 (customer care).
             
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
               YouTube Video:{" "}
              <a
                href="https://www.youtube.com/@ISTEMIndia/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                https://www.youtube.com/@ISTEMIndia/videos
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;