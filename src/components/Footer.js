import React from "react"; 
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  // Scroll to top helper
  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h3 className="text-3xl font-bold mb-3">SupaLink</h3>
          <p className="text-gray-400 text-sm">
            Your local business directory & mini marketplace.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => handleClick("/")} 
                className="hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleClick("/products")} 
                className="hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Products
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleClick("/contact")} 
                className="hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Contact
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleClick("/dashboard")} 
                className="hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Dashboard
              </button>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Policies</h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => handleClick("/terms")} 
                className="hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleClick("/privacy")} 
                className="hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-center py-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} SupaLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
