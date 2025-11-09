import React from 'react';
import { Users, Target, Compass, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const researchAreas = [
    "Fundamental Research in Inorganic Chemistry, Organic Chemistry, Organometallic Chemistry",
    "Various aspects of Material Science",
    "Bio-Science and Engineering, including work on biosensors",
    "Surface Science and Engineering",
    "Condensed Matter Physics"
  ];

  const functions = [
    "SIC has been operating with 32 instruments funded by the institute exclusively and recording data for all departments of the institute.",
    "SIC is continuously supporting academic programs including Ph.D., Masters & Bachelor of technology students by giving hands-on training with the instruments by providing them the opportunity to analyze their own samples.",
    "SIC so far supported various projects funded by external agencies total valued above INR 48.0 crores.",
    "The center has been supporting various industrial organizations across India to develop their bestselling products using SIC sample testing facility.",
    "SIC is playing a very important role in developing curiosity towards science in school students, under grads & post-grads students by giving them live demos and training on the instruments."
  ];

  const timeline = [
    { year: "2011", text: "The facility started functioning in 2 satellite temporary campuses viz., IET & PACL campus with a total of 18 instruments." },
    { year: "2013", text: "8 more high-end instruments were added to facilitate the research at IITI." },
    { year: "2014", text: "The facility was shifted to the permanent campus at Simrol and became an integral part of IITI." },
    { year: "Present", text: "With the gradual addition of more instruments, the facility is now working with a total 35 instruments and planning to expand this number in near future." }
  ];

  return (
    <div className="min-h-screen bg-white">
     {/* Hero Section */}
      <section className="relative h-auto md:h-96 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-cover opacity-20" style={{ backgroundImage: 'url("/sic.png")' }} />
        <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-28 py-12 md:py-0 md:h-full flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              About SIC
            </h1>
            <p className="text-xl text-blue-100">A National Facility of IIT Indore</p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <span className="text-blue-100 font-medium text-sm">Quick Navigation</span>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/faculty"
                className="group px-5 py-2.5 bg-white hover:bg-blue-600 text-blue-700 hover:text-white rounded-md text-sm font-medium transition-all shadow-md flex items-center gap-2"
              >
                Faculty
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/team"
                className="group px-5 py-2.5 bg-white hover:bg-blue-600 text-blue-700 hover:text-white rounded-md text-sm font-medium transition-all shadow-md flex items-center gap-2"
              >
                SIC Team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/outreach"
                className="group px-5 py-2.5 bg-white hover:bg-blue-600 text-blue-700 hover:text-white rounded-md text-sm font-medium transition-all shadow-md flex items-center gap-2"
              >
                Outreach
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      
      {/* Main Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-28 py-16">
        
        {/* Introduction */}
        <div className="mb-16">
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            The Sophisticated Instrumentation Center (SIC) was established in September 2011 with institute funding to expedite the research program at IIT Indore. SIC has now emerged as one of the first such centers in the country, providing extensive analytical instrument support to the users of the research fraternity across the country.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            A major advantage of SIC is its accessibility to the students within the institute as well as to other institutes and industries. A very healthy ratio of students to the time availability on instruments and the quick analysis of external samples makes it a very useful facility.
          </p>
        </div>

        {/* Prof-in-Charge */}
        <div className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Prof-in-Charge</h2>
          <p className="text-lg text-gray-800">Prof. Apurba K. Das</p>
        </div>

        {/* Vision & Mission */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be amongst the top analytical instrument laboratories in the world in terms of cost, efficiency, and range of services.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Providing data recording facilities and expertise in different state-of-the-art instruments, all under one section to facilitate high-quality data analysis to academia and industries.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Goals */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">SIC is Constantly Working on Its Mission</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 leading-relaxed">To support and foster the research enterprise in all branches of science and engineering at the Indian Institute of Technology Indore (IITI).</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 leading-relaxed">To foster growth and competitiveness of the local industries by providing services in the identified gaps to make Indian industrial products as per global standards.</p>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Focus Areas</h2>
          <p className="text-gray-700 leading-relaxed mb-4">The instruments at SIC are mainly focused on the following research areas:</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Functions</h2>
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
            <h2 className="text-2xl font-bold text-gray-900">Progress and Evolution</h2>
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