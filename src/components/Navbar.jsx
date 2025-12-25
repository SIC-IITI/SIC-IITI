import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/instruments", label: "Instruments" },
    { path: "/booking", label: "Book Now" },
    { path: "/about", label: "About SIC", dropdown: true },
    { path: "/contact", label: "Contact" },
    { path: "/login", label: "Login" },
  ];
  const renderNavButtons = (mobile = false) =>
    navItems
      .filter((item) => !item.dropdown)
      .map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }
              ${mobile ? "block w-full text-left" : ""}
            `}
          >
            {item.label}
          </Link>
        );
      });

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-full px-4 sm:px-6 lg:px-14">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-blue-900 flex-shrink-0"
            aria-label="Go to Homepage"
          >
            <img
              src="/iiti-logo-sic-name.png"
              alt="IITI Logo"
              className="h-12 sm:h-14 md:h-16 w-auto max-w-[220px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">

            {navItems.slice(0, 3).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="relative group">
              <Link
                to="/about"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    location.pathname.startsWith("/about")
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                About SIC
              </Link>

              <div
                className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           transition-all duration-200 z-50"
              >
                <Link
                  to="/outreach"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  Outreach
                </Link>
                <Link
                  to="/faculty"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  SIC Team
                </Link>
                <Link
                  to="/team"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  SIC Committee
                </Link>
              </div>
            </div>
            {navItems.slice(4).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 space-y-1">
            {navItems.slice(0, 3).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pl-4 space-y-1">
              <p className="text-sm font-semibold text-gray-500 mt-2">
                About SIC
              </p>

              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-lg"
              >
                About Us
              </Link>

              <Link
                to="/outreach"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-lg"
              >
                Outreach
              </Link>

              <Link
                to="/faculty"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-lg"
              >
                SIC Team
              </Link>

              <Link
                to="/team"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-lg"
              >
                SIC Committee
              </Link>
            </div>

            {navItems.slice(4).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;