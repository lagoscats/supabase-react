import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { session } = useSessionContext();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Caption */}
          <div className="flex-shrink-0 flex flex-col items-start">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="text-2xl font-bold text-gray-900"
            >
              Supalink
            </Link>
            <span className="text-sm md:text-base text-gray-500 mt-1">
              Connecting local vendors & buyers seamlessly
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" onClick={handleLinkClick} className="nav-link">
              Home
            </Link>
            <Link to="/products" onClick={handleLinkClick} className="nav-link">
              Products
            </Link>
            <Link to="/vendor-listings" onClick={handleLinkClick} className="nav-link">
              Vendors
            </Link>
            {session && (
              <Link to="/dashboard/vendor" onClick={handleLinkClick} className="nav-link">
                Vendor Dashboard
              </Link>
            )}
            <Link to="/become-vendor" onClick={handleLinkClick} className="nav-link">
              🛍️ Become a Vendor
            </Link>
            <Link to="/cart" onClick={handleLinkClick} className="relative nav-link">
              🛒 Cart
              {cart.length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
            {session ? (
              <Link to="/dashboard" onClick={handleLinkClick} className="nav-link">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={handleLinkClick} className="nav-link">
                  Login
                </Link>
                <Link to="/register" onClick={handleLinkClick} className="nav-link">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {['/', '/products', '/vendor-listings'].map((path, idx) => (
            <Link
              key={idx}
              to={path}
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100"
            >
              {path === '/' ? 'Home' : path.replace('/', '').replace('-', ' ')}
            </Link>
          ))}
          {session && (
            <Link to="/dashboard/vendor" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100">
              Vendor Dashboard
            </Link>
          )}
          <Link to="/become-vendor" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100">
            🛍️ Become a Vendor
          </Link>
          <Link to="/cart" onClick={handleLinkClick} className="relative block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100">
            🛒 Cart
            {cart.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          {session ? (
            <Link to="/dashboard" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100">
                Login
              </Link>
              <Link to="/register" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
