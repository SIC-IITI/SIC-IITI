import React from "react";
import { Link } from "react-router-dom";
import { Wrench, CalendarDays, ChevronRight } from "lucide-react";

const SECTIONS = [
  {
    to: "/admin/instruments",
    title: "Instruments",
    description: "Add, edit, or remove instruments, categories, and images.",
    icon: Wrench,
    color: "bg-blue-50 text-blue-600",
  },
  {
    to: "/admin/events",
    title: "Events",
    description: "Add, edit, or remove events and workshops.",
    icon: CalendarDays,
    color: "bg-violet-50 text-violet-600",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Manage the facility's public content.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {SECTIONS.map(({ to, title, description, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon size={22} strokeWidth={2} />
            </div>
            <div className="flex items-center gap-1 mb-1">
              <h2 className="text-base font-bold text-gray-900">{title}</h2>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-sm text-gray-500">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}