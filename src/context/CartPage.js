import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const cartContext = useCart();
  const cartItems = cartContext?.cartItems || [];

  if (!cartContext) {
    return <p className="cart-error">Cart is not available. Please try again later.</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-details">
                  <strong>{item.title || item.name || 'Unnamed'}</strong>
                  <span className="cart-price">₦{item.price}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-actions">
            <button className="clear-btn" onClick={cartContext.clearCart}>
              🗑️ Clear Cart
            </button>
            <button className="checkout-btn">
              💳 Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
