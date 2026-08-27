import React from "react";
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { isAdminLoggedIn, clearAdminSecret } from "../../lib/adminAuth";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  const handleLogout = () => {
    clearAdminSecret();
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-6">
            <span className="font-bold text-gray-800 text-lg">SIC Admin</span>
            <nav className="flex gap-2">
              <NavLink to="/admin/instruments" className={linkClass}>
                Instruments
              </NavLink>
              <NavLink to="/admin/events" className={linkClass}>
                Events
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              View site
            </a>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
