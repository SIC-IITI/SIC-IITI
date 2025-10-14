import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Instruments from './pages/Instruments';
import About from './pages/About';
import Booking from './pages/Booking';
import UsageCharges from './pages/UsageCharges';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/usage-charges" element={<UsageCharges />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    
  );
}
