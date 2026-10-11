import React from "react";
import { sampleAnalysisInfo } from "../data/instrumentsData";
import { useTranslation } from "react-i18next";

const BookingPage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            {t('booking.heroTitle')}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
            {t('booking.heroSubtitle')}
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
                {t('booking.internalTitle')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
                {t('booking.internalDesc')}
              </p>
              <a
                href="https://sicbooking.iiti.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                {t('booking.internalButton')}
              </a>
            </div>

            {/* External Users */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-10 border border-gray-100 flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('booking.externalTitle')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
                {t('booking.externalDesc')}
              </p>
              <a
                href="https://www.istem.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                {t('booking.externalButton')}
              </a>
            </div>

          </div>

          {/* Note Section */}
          <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-gray-700 text-lg leading-relaxed">
              <span className="font-semibold text-gray-900">
                {t('booking.noteTitle')}
              </span>{" "}
              {t('booking.noteText')}
            </p>
            <a
              href="https://www.istem.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block  text-blue-600 font-medium hover:underline"
            > https://www.istem.gov.in/
            </a>
            <p className="text-gray-700 text-lg leading-relaxed">

              {t('booking.noteQuery')}

            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
               {t('booking.noteYoutube')}{" "}
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

        {/* Enhanced Payment Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            {/* Header with accent */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600">{t('booking.paymentLabel')}</h2>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t('booking.bankDetailsTitle')}
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
                {t('booking.bankDetailsDesc')}
              </p>
            </div>

            {/* Account Details Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sampleAnalysisInfo.accountDetails.map((item, index) => (
                <div
                  key={item.label}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Animated background accent */}
                  {/* <div className="absolute top-0 right-0 h-20 w-20 bg-blue-50 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-0 h-12 w-12 bg-blue-100 rounded-full -ml-4 -mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-0.5 w-6 bg-blue-600 rounded-full"></div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        {item.label}
                      </p>
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 break-words leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Notice Box */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-600 p-8 shadow-sm">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 9a1 1 0 000 2h6a1 1 0 100-2H8zm1-4a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{t('booking.importantNoteTitle')}</h4>
                  <p className="text-gray-700 leading-relaxed">
                  {t('booking.importantNoteText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </section>

    </div>
  );
};

export default BookingPage;
