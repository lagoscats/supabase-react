// src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const cartContext = useCart();
  const cartItems = cartContext?.cartItems || [];

  if (!cartContext) {
    return <p>Cart is not available. Please try again later.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.title || item.name || 'Unnamed'} – ₦{item.price}
              </li>
            ))}
          </ul>
          <button onClick={cartContext.clearCart} style={{ marginTop: '1rem' }}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
