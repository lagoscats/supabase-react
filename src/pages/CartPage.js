import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout', { state: { items: cart } });
  };

  // Animation variants for list items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-700 dark:text-gray-400">
          Your cart is empty.{' '}
          <a href="/products" className="text-blue-600 dark:text-blue-400 hover:underline">
            Shop now
          </a>
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.li
                  key={item.id}
                  className="flex justify-between items-center py-4"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <span className="font-medium truncate">{item.name} - ₦{item.price.toFixed(2)}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 font-semibold transition"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </motion.button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <motion.div
            className="flex justify-between items-center border-t border-gray-300 dark:border-gray-700 pt-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              ₦{totalPrice.toFixed(2)}
            </span>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={clearCart}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md shadow transition"
            >
              Clear Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md shadow transition"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}
