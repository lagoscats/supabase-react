import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    navigate('/checkout', { state: { items: [product] } });
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col justify-between"
      whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(0,0,0,0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          ₦{product.price.toFixed(2)}
        </p>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-md transition"
        >
          Add to Cart
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleBuyNow}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
        >
          Buy Now
        </motion.button>
      </div>
    </motion.div>
  );
}
