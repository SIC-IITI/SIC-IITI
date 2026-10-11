import React from 'react';
import { Users, Target, Compass, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next"

export default function AboutPage() {
  const { t } = useTranslation();

  const researchAreas = [
    t('about.researchArea1'),
    t('about.researchArea2'),
    t('about.researchArea3'),
    t('about.researchArea4'),
    t('about.researchArea5')
  ];

  const functions = [
    t('about.function1'),
    t('about.function2'),
    t('about.function3'),
    t('about.function4'),
    t('about.function5')
  ];

  const timeline = [
    { year: "2011", text: t('about.timeline2011') },
    { year: "2013", text: t('about.timeline2013') },
    { year: "2014", text: t('about.timeline2014') },
    { year: "Present", text: t('about.timelinePresent') }
  ];

  return (
    <div className="min-h-screen bg-white">
     {/* Hero Section */}
      <section className="relative h-auto md:h-96 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-cover opacity-20" style={{ backgroundImage: 'url("/sic.png")' }} />
    <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-28 py-12 md:py-0 md:h-full flex items-center justify-center text-center">
  <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('about.heroTitle')}
            </h1>
            <p className="text-xl text-blue-100">{t('about.heroSubtitle')}</p>
          </div>

        </div>
      </section>


      {/* Main Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-28 py-16">

        {/* Introduction */}
        <div className="mb-16">
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            {t('about.introP1')}
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            {t('about.introP2')}
          </p>
        </div>

        {/* Prof-in-Charge */}
        <div className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('about.profInChargeTitle')}</h2>
          <p className="text-lg text-gray-800">{t('about.profInChargeName')}</p>
        </div>

        {/* Vision & Mission */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">{t('about.visionTitle')}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('about.visionText')}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">{t('about.missionTitle')}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
          </div>
        </div>

        {/* Mission Goals */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('about.missionGoalsTitle')}</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 leading-relaxed">{t('about.missionGoal1')}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 leading-relaxed">{t('about.missionGoal2')}</p>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('about.researchTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('about.researchSubtitle')}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {researchAreas.map((area, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{area}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Functions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('about.functionsTitle')}</h2>
          <div className="space-y-6">
            {functions.map((func, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">{func}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{t('about.timelineTitle')}</h2>
          </div>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-10 bg-blue-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pt-3">
                  <p className="text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
