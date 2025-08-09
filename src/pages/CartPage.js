import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout', { state: { items: cart } });
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <a href="/products">Shop now</a></p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - ₦{item.price.toFixed(2)}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove"
                >
                  Remove
                </motion.button>
              </li>
            ))}
          </ul>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="btn-clear-cart"
          >
            Clear Cart
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
            className="btn-checkout"
          >
            Proceed to Checkout
          </motion.button>
        </>
      )}
    </div>
  );
}
