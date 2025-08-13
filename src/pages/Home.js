import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-12 md:px-16 lg:px-24 transition-colors duration-500">
      
      {/* Hero Section */}
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Welcome to <span className="text-blue-600">SupaLink</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8"
        >
          Your local online marketplace for trusted products from verified vendors.
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition"
          >
            Explore Products
          </Link>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
        {[
          {
            title: "Top Products",
            text: "Discover best-selling health essentials, immune boosters, and more.",
            link: "/products",
          },
          {
            title: "Become a Vendor",
            text: "Own a store or chemist? List your products for free and reach more customers.",
            link: "/register",
          },
          {
            title: "Track Orders",
            text: "Manage your products, orders, and customer reviews all from one dashboard.",
            link: "/dashboard",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{item.text}</p>
            <Link
              to={item.link}
              className="text-blue-600 hover:underline font-medium"
            >
              {i === 0 ? "Shop Now →" : i === 1 ? "Get Started →" : "Go to Dashboard →"}
            </Link>
          </motion.div>
        ))}
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto mb-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Why SupaLink?</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          SupaLink connects local sellers to buyers with fast delivery, secure payments,
          and verified reviews — all in one easy-to-use platform.
        </p>
      </motion.section>

      {/* Vendor CTA Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mb-16 text-center"
      >
        <Link
          to="/dashboard/manage-products"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-8 py-4 text-lg shadow-md transition"
        >
          🛍️ Become a Vendor – List Your Products
        </Link>
      </motion.div>

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
