

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home,Users, Microscope, Calendar, Info, DollarSign, HelpCircle, User, LogOut, FileText, Menu, X, ChevronDown } from 'lucide-react';
import { Globe, GraduationCap, Mail } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('userRole');

    setIsAuthenticated(false);
    setUserName('');
    setShowUserMenu(false);
    navigate('/');
  };

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/instruments', label: 'Instruments', icon: Microscope },
    { path: '/booking', label: 'Book Now', icon: Calendar },
    { path: '/team', label: 'SIC Team', icon: Users },
    { path: '/outreach', label: 'Outreach', icon: Globe },
    { path: '/faculty', label: 'Faculty', icon: GraduationCap },

    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const authNavItems = [
    { path: '/booking', label: 'Book Now', icon: Calendar },
    { path: '/my-bookings', label: 'My Bookings', icon: FileText },
  ];

  const renderNavButtons = () => {
    const items = [...publicNavItems];
    if (isAuthenticated) {
      items.push(...authNavItems);
    }

    return items.map((item) => {
      const isActive = location.pathname === item.path;
      const Icon = item.icon;

      return (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setIsMenuOpen(false)}
          className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isActive
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-0.5'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className="whitespace-nowrap">{item.label}</span>
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline font-semibold">{userName}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showUserMenu ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />

              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {localStorage.getItem('email')}
                  </p>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="h-4 w-4" />
                  My Profile
                </Link>

                <Link
                  to="/my-bookings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <FileText className="h-4 w-4" />
                  My Bookings
                </Link>

                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }

    return (
      <>
        <Link
          to="/login"
          onClick={() => setIsMenuOpen(false)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            location.pathname === '/login'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          Login
        </Link>
        <Link
          to="/signup"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 text-sm"
        >
          Sign Up
        </Link>
      </>
    );
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 backdrop-blur-sm shadow-md'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo Section */}
          <Link
            to="https://www.iiti.ac.in/"
            className="flex items-center gap-3 sm:gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-transform hover:scale-[1.02]"
          >
            <img
              src="/iiti-logo-sic-name.png"
              alt="IIT Indore SIC Logo"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {renderNavButtons()}
            <div className="ml-2 flex items-center gap-2">
              {renderAuthButtons()}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {renderNavButtons()}
            <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-gray-100">
              {renderAuthButtons()}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
