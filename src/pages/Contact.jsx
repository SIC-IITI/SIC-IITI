import React from 'react';

export default function ContactPage() {
  const contacts = [
    {
      title: "Professor In-charge, SIC",
      head: "Apurba K Das",
      email: "head-sic@iiti.ac.in",
    },
    {
      title: "Technical Support",
      head: "Ghanashyam Bhavsar",
      email: "ghanashyam@iiti.ac.in",
    },
    {
      title: "Technical Support",
      head: "Kinny Pandey",
      email: "kinny@iiti.ac.in",
    },
    {
      title: "Administrative Support",
      head: "Mr. Ranjeet Raghuwanshi",
      email: "managersic@iiti.ac.in",
    },
  ];

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-10 py-20">
        <div className="max-w-md w-full">

          {/* Subheading */}
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
            Sophisticated Instrumentation Centre
          </p>

          {/* Title */}
          <h1 className="text-4xl font-semibold text-gray-900 mb-6 leading-tight">
            Our Team
          </h1>

          {/* Accent Line */}
          <div className="h-[2px] w-12 bg-blue-600 mb-8"></div>

          {/* Contact List */}
          <div className="space-y-5">
            {contacts.map((contact, index) => (
              <div key={index}>
                <p className="text-lg font-medium text-gray-900">
                  {contact.head}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  {contact.title}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>



        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden lg:block w-1/2 pt-2 h-screen relative">
        <img
          src="/abhinandan.png"
          alt="SIC Facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent"></div>
      </div>

    </div>
  );
}