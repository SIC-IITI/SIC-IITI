import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/instruments', label: 'Instruments' },
    { path: '/booking', label: 'Book Now' },
    { path: '/about', label: 'About SIC' },
    { path: '/contact', label: 'Contact' },
    { path: '/login', label: 'Login' },

  ];

  const renderNavButtons = () =>
    navItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <Link
          key={item.path}
          to={item.path}
          className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            isActive
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
          }`}
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
            className="flex items-center gap-3 text-2xl font-bold text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
            aria-label="Go to Homepage"
          >
            <img src="/iiti-logo-sic-name.png" alt="IITI Logo" className="h-auto w-[22vw]" />

          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {renderNavButtons()}
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {renderNavButtons()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
