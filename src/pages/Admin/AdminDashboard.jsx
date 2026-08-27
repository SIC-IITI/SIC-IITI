import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        <Link
          to="/admin/instruments"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-bold text-blue-700 mb-1">Instruments</h2>
          <p className="text-sm text-gray-500">
            Add, edit, or remove instruments, categories, and images.
          </p>
        </Link>
        <Link
          to="/admin/events"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-bold text-blue-700 mb-1">Events</h2>
          <p className="text-sm text-gray-500">
            Add, edit, or remove events and workshops.
          </p>
        </Link>
      </div>
    </div>
  );
}
