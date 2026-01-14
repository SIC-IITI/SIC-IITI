import React, { useState, useEffect, useCallback } from "react";
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

  const aboutDropdownItems = [
    { path: "/about", label: "About Us" },
    { path: "/outreach", label: "Outreach" },
    { path: "/sic-team", label: "SIC Team" },
    { path: "/sic-committee", label: "SIC Committee" },
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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-full px-4 sm:px-6 lg:px-14">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
         <Link
  to="/"
  aria-label="Go to Homepage"
  className="flex items-center gap-3 flex-shrink-0"
>
  {/* IIT Logo */}
  <img
    src="/iiti-logo.png"
    alt="IIT Indore Logo"
    className="h-12 w-auto"
  />

  {/* Text Block */}
  <div className="hidden sm:flex flex-col justify-center leading-tight">
    <span className="text-[17px] font-semibold text-black tracking-tight">
      Sophisticated Instrumentation Centre
    </span>

    <span className="block w-full border-b border-black my-0.5"></span>

    <span className="text-[13px] font-normal text-gray-700">
      Indian Institute of Technology Indore
    </span>
  </div>
</Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {/* First 3 items */}
            {navItems.slice(0, 3).map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
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
                className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
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
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Last 2 items */}
            {navItems.slice(4).map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
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
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
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

      {/* Mobile Menu Overlay and Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
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
            {/* Close Button */}
            <button
              onClick={closeMobileMenu}
              className="self-end mb-6 text-gray-600 hover:text-black text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 overflow-y-auto">
              {/* First 3 items */}
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

              {/* Last 2 items */}
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
