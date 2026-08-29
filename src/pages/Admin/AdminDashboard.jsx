import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Microscope, CalendarDays, Users, ArrowRight } from "lucide-react";
import { fetchInstruments, fetchEvents, fetchOutreach } from "../../lib/api";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ instruments: null, events: null, outreach: null });

  useEffect(() => {
    fetchInstruments()
      .then((data) => setCounts((c) => ({ ...c, instruments: data.length })))
      .catch(() => setCounts((c) => ({ ...c, instruments: 0 })));
    fetchEvents()
      .then((data) => setCounts((c) => ({ ...c, events: data.length })))
      .catch(() => setCounts((c) => ({ ...c, events: 0 })));
    fetchOutreach()
      .then((data) => setCounts((c) => ({ ...c, outreach: data.length })))
      .catch(() => setCounts((c) => ({ ...c, outreach: 0 })));
  }, []);

  const cards = [
    {
      to: "/admin/instruments",
      label: "Instruments",
      count: counts.instruments,
      description: "Add, edit, or remove instruments, categories, and images.",
      icon: Microscope,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      to: "/admin/events",
      label: "Events",
      count: counts.events,
      description: "Add, edit, or remove events and workshops.",
      icon: CalendarDays,
      accent: "bg-violet-50 text-violet-600",
    },
    {
      to: "/admin/outreach",
      label: "Outreach",
      count: counts.outreach,
      description: "Add, edit, or remove outreach visits — also shown on the Home page.",
      icon: Users,
      accent: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Dashboard</h1>
        <p className="mt-0.5 text-sm text-gray-500">Overview of your content.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {cards.map(({ to, label, count, description, icon: Icon, accent }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-400" />
            </div>
            <div className="mb-1 flex items-baseline gap-2">
              <h2 className="text-lg font-bold text-gray-900">{label}</h2>
              {count === null ? (
                <span className="h-4 w-6 animate-pulse rounded bg-gray-200" />
              ) : (
                <span className="text-sm font-semibold text-gray-400">{count}</span>
              )}
            </div>
            <p className="text-sm text-gray-500">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
