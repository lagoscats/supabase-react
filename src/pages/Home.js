import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-900 px-6 py-12 md:px-16 lg:px-24">
      
      {/* Hero Section */}
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to SupaLink
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Your local online marketplace for trusted products from verified vendors.
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition"
        >
          Explore Products
        </Link>
      </header>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold mb-3">Top Products</h3>
          <p className="text-gray-600 mb-4">
            Discover best-selling health essentials, immune boosters, and more.
          </p>
          <Link to="/products" className="text-blue-600 hover:underline font-medium">
            Shop Now →
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold mb-3">Become a Vendor</h3>
          <p className="text-gray-600 mb-4">
            Own a store or chemist? List your products for free and reach more customers.
          </p>
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Get Started →
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold mb-3">Track Orders</h3>
          <p className="text-gray-600 mb-4">
            Manage your products, orders, and customer reviews all from one dashboard.
          </p>
          <Link to="/dashboard" className="text-blue-600 hover:underline font-medium">
            Go to Dashboard →
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Why SupaLink?</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          SupaLink connects local sellers to buyers with fast delivery, secure payments,
          and verified reviews — all in one easy-to-use platform.
        </p>
      </section>

      {/* Vendor CTA Button */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <Link
          to="/dashboard/manage-products"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-8 py-4 text-lg transition"
        >
          🛍️ Become a Vendor – List Your Products
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center mb-8">
        <Link
          to="/products"
          className="text-blue-600 hover:text-blue-800 font-medium underline"
        >
          Browse Products →
        </Link>
      </footer>
    </div>
  );
}
