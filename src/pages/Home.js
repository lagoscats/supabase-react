// src/pages/Home.js (Landing Page)
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="landing-container">
      <header className="hero-section">
        <h1>Welcome to SupaLink</h1>
        <p>Your local online marketplace for trusted products from verified vendors.</p>
        <Link to="/products" className="cta-button">Explore Products</Link>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Top Products</h3>
          <p>Discover best-selling health essentials, immune boosters, and more.</p>
          <Link to="/products">Shop Now →</Link>
        </div>

        <div className="feature-card">
          <h3>Become a Vendor</h3>
          <p>Own a store or chemist? List your products for free and reach more customers.</p>
          <Link to="/register">Get Started →</Link>
        </div>

        <div className="feature-card">
          <h3>Track Orders</h3>
          <p>Manage your products, orders, and customer reviews all from one dashboard.</p>
          <Link to="/dashboard">Go to Dashboard →</Link>
        </div>
      </section>

      <section className="about-section">
        <h2>Why SupaLink?</h2>
        <p>
          SupaLink connects local sellers to buyers with fast delivery, secure payments,
          and verified reviews — all in one easy-to-use platform.
        </p>
      </section>

      <Link to="/dashboard/manage-products" className="vendor-button">
        🛍️ Become a Vendor – List Your Products
      </Link>


      <footer className="landing-footer">
        <Link to="/products" className="explore-button">Browse Products →</Link>
      </footer>
    </div>
  );
}
