import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Clock, Users, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Images for the horizontal scrolling gallery
  const facilityImages = [
    { src: '/sic.png', alt: 'SIC Building Exterior' },
    { src: '/sic-ppl2.png', alt: 'SIC Campus View' },
    { src: '/close-sic.png', alt: 'SIC Main Entrance' },
    { src: '/details-chart.png', alt: 'IIT Indore Logo' },
    { src: '/sic-ppl.png', alt: 'SIC Progress Infographic' }
  ];  

  const scrollImages = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % facilityImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + facilityImages.length) % facilityImages.length);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % facilityImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section with Background Image */}
      <section className="relative  overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-blue-6 00 bg-blend-multiply" // Changed to bg-contain and added bg-no-repeat
          style={{
            backgroundImage: "url('/sic.png')", 
            opacity: 1,
          }}
        />
        
       <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-800/80" />
         
        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
           
              <h1 className="text-5xl lg:text-5xl font-bold text-white leading-tight mb-6">               
                Welcome to <br/>Sophisticated Instrumentation Center - IIT Indore              
              </h1>
              
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
               Book Advanced Research Instruments
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/instruments">
                <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 inline-flex items-center gap-2 shadow-lg">
                  Browse Instruments <ChevronRight className="w-5 h-5" />
                </button>
                </Link>
                <Link to="/booking">
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 inline-flex items-center gap-2">
                  Book Now <Calendar className="w-5 h-5" />
                </button>
                </Link>
              </div>
            </div>

            {/* Right - IIT Indore Logo */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
                <img 
                  src="/close-sic.png" 
                  alt="IIT Indore Logo" 
                  className=" bg-white object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scrolling Image Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Infrastructure</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              State-of-the-art facilities supporting cutting-edge research
            </p>
          </div>

          <div className="relative">
            {/* Main Image Display */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={facilityImages[currentImageIndex].src}
                alt={facilityImages[currentImageIndex].alt}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              
              {/* Navigation Arrows */}
              <button 
                onClick={() => scrollImages('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-blue-900" />
              </button>
              <button 
                onClick={() => scrollImages('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-blue-900" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full">
                <span className="text-blue-900 font-semibold">
                  {currentImageIndex + 1} / {facilityImages.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-4 mt-6 justify-center overflow-x-auto pb-4">
              {facilityImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-4 transition-all ${
                    index === currentImageIndex 
                      ? 'border-blue-600 scale-110' 
                      : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">How to Book Instruments</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Simple and transparent process to book your required instruments
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-600">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Sign Up / Login</h3>
                <p className="text-gray-600">
                  Create your account or login to access the booking system
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-600">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Select Instrument</h3>
                <p className="text-gray-600">
                  Browse our catalog and choose the instrument you need
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-600">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Book Time Slot</h3>
                <p className="text-gray-600">
                  Check availability and reserve your preferred time slot
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
               
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-600">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  4
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Visit & Analyze</h3>
                <p className="text-gray-600">
                  Visit SIC with your sample and get expert assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Why Book With Us</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience hassle-free instrument booking with comprehensive support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Intuitive online system to book instruments anytime, anywhere
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Real-Time Availability</h3>
              <p className="text-gray-600">
                Check instrument availability in real-time and book instantly
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Trained operators to assist with measurements and analysis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Standardized SOPs ensuring reliable and accurate results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'url(/api/placeholder/1200/400)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            <div className="relative p-12 lg:p-16 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Book Your Instrument?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of researchers using our advanced instrumentation. Create an account and start booking today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 inline-flex items-center justify-center gap-2">
                  Get Started <ChevronRight className="w-5 h-5" />
                </button>
                </Link>
                <Link to="/instruments">
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 inline-flex items-center justify-center gap-2">    
                  View Instruments
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;