// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// function Navbar() {
//   const location = useLocation();

//   const navItems = [
//     { path: '/', label: 'Home' },
//     { path: '/instruments', label: 'Instruments' },
//     { path: '/about', label: 'About' },
//     { path: '/booking', label: 'Book Now' },
//     { path: '/usage-charges', label: 'Charges' },
//     { path: '/faq', label: 'FAQ' },
//     { path: '/login', label: 'Login' },
//     { path: '/signup', label: 'Sign Up' },
//   ];

//   const renderNavButtons = () =>
//     navItems.map((item) => {
//       const isActive = location.pathname === item.path;
//       return (
//         <Link
//           key={item.path}
//           to={item.path}
//           className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
//             isActive
//               ? 'bg-blue-600 text-white shadow-sm'
//               : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
//           }`}
//         >
//           {item.label}
//         </Link>
//       );
//     });

//   return (
//     <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//       <div className="max-w-full px-4 py-2 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <Link
//             to="/"
//             className="flex items-center gap-3 text-2xl font-bold text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
//             aria-label="Go to Homepage"
//           >
//             <img src="/iiti-logo-sic-name.png" alt="IITI Logo" className="h-auto w-[22vw]" />

//           </Link>

//           <div className="hidden md:flex items-center space-x-2">
//             {renderNavButtons()}
//           </div>
//         </div>

//         {/* Mobile view */}
//         <div className="md:hidden pb-3">
//           <div className="flex items-center gap-2 overflow-x-auto">
//             {renderNavButtons()}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Check authentication status on component mount and route change
  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName') || localStorage.getItem('name');

    if (token) {
      setIsAuthenticated(true);
      setUserName(storedUserName || 'User');
    } else {
      setIsAuthenticated(false);
      setUserName('');
    }
  };

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('userRole');

    // Update state
    setIsAuthenticated(false);
    setUserName('');
    setShowUserMenu(false);

    // Redirect to home
    navigate('/');
  };

  const publicNavItems = [
    { path: '/', label: 'Home' },
    { path: '/instruments', label: 'Instruments' },
    { path: '/about', label: 'About' },
    { path: '/usage-charges', label: 'Charges' },
    { path: '/faq', label: 'FAQ' },
  ];

  const authNavItems = [
    { path: '/booking', label: 'Book Now' },
    { path: '/my-bookings', label: 'My Bookings' },
  ];

  const renderNavButtons = () => {
    const items = [...publicNavItems];

    if (isAuthenticated) {
      items.push(...authNavItems);
    }

    return items.map((item) => {
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
  };

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline">{userName}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                showUserMenu ? 'rotate-180' : ''
              }`}
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

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />

              {/* Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">
                    {localStorage.getItem('email')}
                  </p>
                </div>

                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  👤 My Profile
                </Link>

                <Link
                  to="/my-bookings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  📋 My Bookings
                </Link>

                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  ⚙️ Settings
                </Link>

                <div className="border-t border-gray-200 mt-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }

    // Not authenticated - show login/signup
    return (
      <>
        <Link
          to="/login"
          className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            location.pathname === '/login'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            location.pathname === '/signup'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Sign Up
        </Link>
      </>
    );
  };

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
            <div className="ml-2 flex items-center gap-2">
              {renderAuthButtons()}
            </div>
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {renderNavButtons()}
            {renderAuthButtons()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;