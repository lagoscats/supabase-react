import React from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';
import './Navbar.css';

export default function Navbar() {
  const { session } = useSessionContext();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SupaLink</Link>
      </div>

      <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
      <label htmlFor="navbar-toggle" className="navbar-icon">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <div className="navbar-menu">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/vendor-listings">Vendors</Link>
        {session && <Link to="/dashboard/vendor">Vendor Dashboard</Link>}
        <Link to="/become-vendor">🛍️ Become a Vendor</Link>
        <Link to="/cart">🛒 Cart</Link>
        <Link to="/contact">Contact</Link>
        {session ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
