import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/instruments", label: "Instruments" },
    { path: "https://sicbooking.iiti.ac.in/login", label: "Book Now" },
    { path: "/about", label: "About SIC", dropdown: true },
    { path: "/dst-fist", label: "DST-FIST" },
    { path: "/contact", label: "Contact" },
  ];

  const aboutDropdownItems = [
    { path: "/about", label: "About Us" },
    { path: "/outreach", label: "Outreach" },
    { path: "/team", label: "SIC Committee" },
    { path: "/faculty", label: "SIC Team" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const isActivePath = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <img
                src="/iiti-logo.png"
                alt="IIT Indore Logo"
                className="h-12 w-12 lg:h-16 lg:w-16 object-contain"
              />

              {/* Hide this text on mobile, show on md and up */}
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-[14px] font-semibold text-gray-900">
                  भारतीय प्रौद्योगिकी संस्थान इंदौर
                </span>
                <span className="block w-full border-b border-black my-0.5"></span>
                <span className="text-[10px] text-gray-700">
                  INDIAN INSTITUTE OF TECHNOLOGY INDORE
                </span>
              </div>
            </Link>

            {/* Divider - also hidden on mobile */}
            <div className="hidden md:block h-12 w-[1px] bg-blue-500 shrink-0"></div>

            {/* SIC Text - Forced to one line on all screens */}
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] lg:text-[18px] text-black font-bold whitespace-nowrap">
                Sophisticated Instrumentation Centre
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1 lg:gap-2">
            {/* First 3 items */}
            {navItems.slice(0, 3).map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* About SIC Dropdown */}
            <div className="relative group">
              <button
                className="whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded="false"
              >
                About SIC
                <svg
                  className="w-4 h-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                {aboutDropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Remaining items (DST-FIST, Contact) */}
            {navItems.slice(4).map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="xl:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      >
        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full p-6">
            <button
              onClick={closeMobileMenu}
              className="self-end mb-6 text-gray-600 hover:text-black text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              ✕
            </button>

            <div className="flex flex-col gap-4 overflow-y-auto">
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`text-lg font-medium transition-colors px-3 py-2 rounded-lg ${
                    isActivePath(item.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-800 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* About SIC Section */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-3">
                  About SIC
                </p>
                {aboutDropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`block text-base font-medium transition-colors px-3 py-2 rounded-lg mb-2 ${
                      isActivePath(item.path)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Remaining items */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                {navItems.slice(4).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`block text-lg font-medium transition-colors px-3 py-2 rounded-lg mb-2 ${
                      isActivePath(item.path)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-800 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;