import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FacilityStatus from './pages/Instruments/FacilityStatus';
import Home from "./pages/Home";
import Instruments from "./pages/Instruments/Instruments";
import InstrumentForms from "./pages/Instruments/InstrumentForms";
import About from "./pages/About";
import Booking from "./pages/Booking";
// import UsageCharges from "./pages/UsageCharges";
import FAQ from "./pages/FAQ";
import InstrumentDetails from "./pages/Instruments/InstrumentDetail";
import Bookingform from "./pages/Bookingform";
import Contact from "./pages/Contact";
import FacultyPage from "./pages/FacultyPage";
import TeamPage from "./pages/TeamPage";
import Events from "./pages/Events";
import Outreach from "./pages/Outreach";
import ExcellencePage from "./pages/Excellence";
import DstFist from "./pages/DstFist";
import SampleAnalysisCharges from "./pages/SampleAnalysisCharges";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import InstrumentsAdmin from "./pages/Admin/InstrumentsAdmin";
import InstrumentForm from "./pages/Admin/InstrumentForm";
import EventsAdmin from "./pages/Admin/EventsAdmin";
import EventForm from "./pages/Admin/EventForm";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className={isAdminRoute ? "min-h-screen bg-gray-50" : "min-h-screen flex flex-col bg-white w-full max-w-8xl mx-auto px-1 md:px-6 lg:px-12 xl:px-20"}>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? "" : "flex-1 max-w-full w-full mx-auto "}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/instruments/forms" element={<InstrumentForms />} />
          <Route path="/instruments/:id" element={<InstrumentDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookingform" element={<Bookingform />} />
          {/* <Route path="/usage-charges" element={<UsageCharges />} /> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sample-analysis-charges" element={<SampleAnalysisCharges />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/outreach" element={<Outreach />} />
          <Route path="/excellence" element={<ExcellencePage />} />
          <Route path="/dst-fist" element={<DstFist />} />
          <Route path="/facility-status" element={<FacilityStatus />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="instruments" element={<InstrumentsAdmin />} />
            <Route path="instruments/new" element={<InstrumentForm />} />
            <Route path="instruments/:id/edit" element={<InstrumentForm />} />
            <Route path="events" element={<EventsAdmin />} />
            <Route path="events/new" element={<EventForm />} />
            <Route path="events/:id/edit" element={<EventForm />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}