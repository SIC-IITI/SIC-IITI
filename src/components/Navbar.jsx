import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/instruments', label: 'Instruments' },
    { path: '/booking', label: 'Book Now' },
    // { path: '/about', label: 'About SIC' },
    { path: '/contact', label: 'Contact' },
    { path: '/login', label: 'Login' },
  ];

  const renderNavButtons = (mobile = false) =>
    navItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
          className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            isActive
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
          } ${mobile ? 'block w-full text-left' : ''}`}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-full px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg flex-shrink-0"
            aria-label="Go to Homepage"
          >
            <img
              src="/iiti-logo-sic-name.png"
              alt="IITI Logo"
              className="h-12 w-auto sm:h-14 md:h-16 max-w-[180px] sm:max-w-[220px] md:max-w-none"
            />
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden lg:flex items-center space-x-2">
            {renderNavButtons()}
          </div> */}


          <div className="hidden lg:flex items-center space-x-2">
  {renderNavButtons().filter(
    (item) => !item.props.children.includes("About SIC")
  )}

  {/* About SIC Dropdown */}
  <div className="relative group">
    <span className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600">
      About SIC
    </span>

    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <Link
        to="/about"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
      >
        About Us
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
</div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-3 pt-2 space-y-1">
            {renderNavButtons(true)}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;