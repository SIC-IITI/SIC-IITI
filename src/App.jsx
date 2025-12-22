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
import InstrumentDetails from "./pages/Instruments/InstrumentDetail";
import Bookingform from "./pages/Bookingform";
import AdminDashboard from "./pages/Admin";
import Contact from "./pages/Contact";
import FacultyPage from "./pages/FacultyPage";
import TeamPage from "./pages/TeamPage";
import Events from "./pages/Events";
import Outreach from "./pages/Outreach";
import ExcellencePage from "./pages/Excellence";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-full w-full mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/instruments/:id" element={<InstrumentDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/booking" element={<AdminDashboard />} />
          <Route path="/bookingform" element={<Bookingform />} />
          <Route path="/usage-charges" element={<UsageCharges />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/outreach" element={<Outreach />} />
          <Route path="/excellence" element={<ExcellencePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
