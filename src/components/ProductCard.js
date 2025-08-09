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
      className="product-card"
      whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(0,0,0,0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <h3>{product.name}</h3>
      <p>₦{product.price.toFixed(2)}</p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => addToCart(product)}
        className="btn-add-cart"
      >
        Add to Cart
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleBuyNow}
        className="btn-buy-now"
      >
        Buy Now
      </motion.button>
    </motion.div>
  );
}
