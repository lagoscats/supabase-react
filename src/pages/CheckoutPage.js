// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client'; // your Supabase client instance

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  // Place order in Supabase (example, adjust to your schema)
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
        quantity: 1, // for now, default 1
        price: item.price,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      alert('Order placed successfully!');
      navigate('/'); // redirect to home or orders page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <p>No items to checkout.</p>;
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ₦{item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p><strong>Total: ₦{totalPrice.toFixed(2)}</strong></p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={placeOrder} disabled={loading}>
        {loading ? 'Placing order...' : 'Place Order'}
      </button>
    </div>
  );
}
