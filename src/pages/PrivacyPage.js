import React, { useEffect } from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-8 lg:px-20">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-4 leading-relaxed">
          At <strong className="text-indigo-600">SupaLink</strong>, your privacy is important to us. 
          This policy explains how we collect, use, and protect your information.
        </p>

        <Section
          title="1. Information We Collect"
          text="We collect personal details you provide, such as your name, email, and order history, to improve your experience."
        />
        <Section
          title="2. How We Use Your Information"
          text="We use your data to process orders, communicate with you, and improve our services. We do not sell your data to third parties."
        />
        <Section
          title="3. Cookies"
          text="We use cookies to personalize your experience. You can disable them in your browser settings."
        />
        <Section
          title="4. Third-Party Services"
          text="We work with trusted payment processors and analytics providers who adhere to strict data protection standards."
        />
        <Section
          title="5. Security Measures"
          text="We implement industry-standard security to protect your personal information."
        />

        <div className="mt-8 text-sm text-gray-500 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </motion.div>
    </div>
  );
};

// Reusable animated section component
const Section = ({ title, text }) => (
  <motion.div
    className="mt-6"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </motion.div>
);

export default PrivacyPolicy;
