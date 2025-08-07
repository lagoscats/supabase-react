import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">SupaLink</Link>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
        <Link to="/products" className="nav-link" onClick={toggleMenu}>Products</Link>
        <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</Link>
        <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
        <Link to="/register" className="nav-link" onClick={toggleMenu}>Register</Link>
        <Link to="/login" className="nav-link" onClick={toggleMenu}>Login</Link>
        <Link to="/cart" className="nav-link cart-link" onClick={toggleMenu}>
          🛒 Cart
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </Link>
      </div>

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
