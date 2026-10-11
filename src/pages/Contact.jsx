import React from 'react';
import { useTranslation } from "react-i18next"

export default function ContactPage() {
  const { t } = useTranslation();

  const contacts = [
    {
      title: t('contact.titleProfessor'),
      head: "Prof. Krushna R. Mavani",
      email: "head-sic@iiti.ac.in",
    },
    {
      title: t('contact.titleTechnicalSuperintendent'),
      head: "Ghanashyam Bhavsar",
      email: "ghanashyam@iiti.ac.in",
    },
    {
      title: t('contact.titleTechnicalSuperintendent'),
      head: "Kinny Pandey",
      email: "kinny@iiti.ac.in",
    },
    {
      title: t('contact.titleJuniorTechnicalSuperintendent'),
      head: "Ravinder Kumar",
      email: "ravinderk@iiti.ac.in",
    },
    {
      title: t('contact.titleJuniorTechnicalAssistant'),
      head: "Atul Singh",
      email: "atul.singh@iiti.ac.in",
    },
    {
      title: t('contact.titleJuniorTechnicalAssistant'),
      head: "Sagar Patail",
      email: "sagarpatail@iiti.ac.in",
    },
    {
      title: t('contact.titleAdministrativeSupport'),
      head: "Ranjeet Raghuvanshi",
      email: "managersic@iiti.ac.in",
    },
  ];

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-10 py-10">
        <div className="max-w-md w-full pb-[10rem]">

          {/* Subheading */}
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
            {t('contact.subtitle')}
          </p>

          {/* Title */}
          <h1 className="text-4xl font-semibold text-gray-900 mb-6 leading-tight">
            {t('contact.title')}
          </h1>

          {/* Accent Line */}
          <div className="h-[2px] w-12 bg-blue-600 mb-8"></div>

          {/* General Contact */}
          <div className="mb-8 space-y-1">
            <p className="text-sm text-gray-500">
              {t('contact.generalEmail')}{" "}
              <a
                href="mailto:sic@iiti.ac.in"
                className="text-blue-600 hover:underline"
              >
                sic@iiti.ac.in
              </a>
            </p>
            <p className="text-sm text-gray-500">
              {t('contact.phoneLabel')}{" "}
              <a href="tel:+917316603311" className="text-blue-600 hover:underline">
                0731-660-3311
              </a>
            </p>
          </div>

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
