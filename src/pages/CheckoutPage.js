import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert('Please login to place an order.');
        setLoading(false);
        return;
      }

      // Insert order
      const { error: orderError, data: orderData } = await supabase
        .from('orders')
        .insert([{ user_id: user.id, total_price: totalPrice }])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderId = orderData.id;

      // Insert order items
      const orderItems = items.map(item => ({
        order_id: orderId,
        product_id: item.id,
        quantity: 1,
        price: item.price,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      alert('Order placed successfully!');
      navigate('/'); // redirect home or to orders page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <p className="empty-cart-msg">No items to checkout.</p>;
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <ul className="checkout-items">
        {items.map(item => (
          <li key={item.id} className="checkout-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">₦{item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <p className="total-price">
        <strong>Total: ₦{totalPrice.toFixed(2)}</strong>
      </p>

      {error && <p className="error-msg">{error}</p>}

      <button
        onClick={placeOrder}
        disabled={loading}
        className="place-order-btn"
        aria-busy={loading}
      >
        {loading ? 'Placing order...' : 'Place Order'}
      </button>
    </div>
  );
}
