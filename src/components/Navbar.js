import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useCart } from '../context/CartContext';
import DarkModeToggle from './DarkModeToggle'; // import the toggle component

export default function Navbar() {
  const { session } = useSessionContext();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when a nav link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="text-2xl font-bold text-gray-900 dark:text-gray-100"
            >
              SupaLink
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={handleLinkClick}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Products
            </Link>
            <Link
              to="/vendor-listings"
              onClick={handleLinkClick}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Vendors
            </Link>
            {session && (
              <Link
                to="/dashboard/vendor"
                onClick={handleLinkClick}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Vendor Dashboard
              </Link>
            )}
            <Link
              to="/become-vendor"
              onClick={handleLinkClick}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              🛍️ Become a Vendor
            </Link>

            <Link
              to="/cart"
              onClick={handleLinkClick}
              className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center"
            >
              🛒 Cart
              {cart.length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Contact
            </Link>

            {session ? (
              <Link
                to="/dashboard"
                onClick={handleLinkClick}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* Dark Mode Toggle */}
            <div className="ml-4">
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Dark Mode Toggle on mobile */}
            <div className="mr-2">
              <DarkModeToggle />
            </div>

            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {menuOpen ? (
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
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            Products
          </Link>
          <Link
            to="/vendor-listings"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            Vendors
          </Link>
          {session && (
            <Link
              to="/dashboard/vendor"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
            >
              Vendor Dashboard
            </Link>
          )}
          <Link
            to="/become-vendor"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            🛍️ Become a Vendor
          </Link>
          <Link
            to="/cart"
            onClick={handleLinkClick}
            className="relative block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            🛒 Cart
            {cart.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <Link
            to="/contact"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            Contact
          </Link>
          {session ? (
            <Link
              to="/dashboard"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={handleLinkClick}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
