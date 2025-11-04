import React from "react";
import { Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Instruments from "./pages/Instruments/Instruments";
import About from "./pages/About";
import Booking from "./pages/Booking";
import UsageCharges from "./pages/UsageCharges";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InstrumentViewer from "./pages/Instruments/InstrumentViewer";
import Bookingform from "./pages/Bookingform";
import AdminDashboard from "./pages/Admin";
import Contact from "./pages/Contact";
import TeamPage from "./pages/FacultyPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-full w-full mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/instruments/:id" element={<InstrumentViewer />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/booking" element={<AdminDashboard />} />
          <Route path="/bookingform" element={<Bookingform />} />
          <Route path="/usage-charges" element={<UsageCharges />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
