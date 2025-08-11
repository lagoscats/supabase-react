import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = (location.state?.items || []).map(item => ({
    ...item,
    quantity: item.quantity || 1,
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { updatedItems, total } = useMemo(() => {
    const updatedItems = items.map(item => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));
    const total = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);
    return { updatedItems, total };
  }, [items]);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to place an order.');

      const { error: orderError } = await supabase.from('orders').insert([
        {
          user_id: user.id,
          items: updatedItems,
          total_price: total,
          status: 'pending',
        },
      ]);

      if (orderError) throw orderError;

      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message || 'An error occurred while placing your order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Checkout</h1>

      {updatedItems.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6 mb-8">
            {updatedItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md"
              >
                <img
                  src={item.image_url || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">Price: ₦{item.price.toLocaleString()}</p>
                  <p className="text-gray-700 dark:text-gray-300">Quantity: {item.quantity}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    Subtotal: ₦{item.subtotal.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Total: ₦{total.toLocaleString()}
            </h2>

            {error && (
              <p className="mb-4 text-red-600 dark:text-red-400 font-semibold">{error}</p>
            )}
            {success && (
              <p className="mb-4 text-green-600 dark:text-green-400 font-semibold">
                Order placed successfully!
              </p>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-md font-semibold transition"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
