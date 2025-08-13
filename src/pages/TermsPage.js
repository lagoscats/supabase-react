// src/pages/TermsPage.js
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function TermsPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 leading-relaxed">
      {/* Page Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-indigo-600"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Terms & Conditions
      </motion.h1>

      {/* Last Updated */}
      <motion.p
        className="text-center text-gray-500 mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Last Updated: {new Date().toLocaleDateString()}
      </motion.p>

      {/* Sections */}
      {[
        {
          title: "1. About SupaLink",
          content:
            "SupaLink is a local business directory and mini marketplace where vendors can list their products, and buyers can discover, connect, and purchase directly from vendors. Some listings may contain affiliate links to third-party websites.",
        },
        {
          title: "2. Eligibility",
          content:
            "You must be at least 18 years old or have parental consent to use SupaLink.",
        },
        {
          title: "3. Account Registration",
          list: [
            "Provide accurate and up-to-date information.",
            "Keep your login credentials secure.",
          ],
        },
        {
          title: "4. Vendor Responsibilities",
          list: [
            "Only list products you have the right to sell.",
            "Comply with all applicable laws and regulations.",
          ],
        },
        {
          title: "5. Payments",
          content:
            "Buyers may purchase products through integrated payments or vendor-provided links. SupaLink may charge transaction fees. Refunds are subject to vendor policies.",
        },
        {
          title: "6. Prohibited Activities",
          list: [
            "No posting illegal or harmful content.",
            "No bypassing payment systems.",
          ],
        },
        {
          title: "7. Limitation of Liability",
          content:
            "SupaLink is a platform and is not responsible for the quality or delivery of products sold by vendors.",
        },
      ].map((section, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-indigo-500 mb-2">
            {section.title}
          </h2>
          {section.content && <p>{section.content}</p>}
          {section.list && (
            <ul className="list-disc pl-6 space-y-1">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}

      {/* Back to Top Button */}
      <div className="text-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Back to Top ↑
        </motion.button>
      </div>
    </div>
  );
}
