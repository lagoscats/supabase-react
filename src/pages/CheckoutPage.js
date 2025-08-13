import React, { useState, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useCart } from "../context/CartContext";
import { useSessionContext } from "@supabase/auth-helpers-react";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const { cart, clearCart } = useCart();

  const items = (location.state?.items || []).map((item) => ({
    ...item,
    quantity: item.quantity || 1,
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { updatedItems, total } = useMemo(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));
    const total = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);
    return { updatedItems, total };
  }, [items]);

  const handlePlaceOrder = async () => {
    if (!session?.user) {
      setError("You must be logged in to place an order.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("orders").insert(
        cart.map((item) => ({
          buyer_id: session.user.id,
          product_id: item.id,
          quantity: item.quantity,
          items: item.name,
          total_amount: item.price * item.quantity,
        }))
      );

      if (error) throw error;

      clearCart();

      // Navigate to payment page with total amount
      navigate("/payment", { state: { total } });
    } catch (err) {
      console.error("Order failed:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
        Checkout
      </h1>

      {updatedItems.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Your cart is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {updatedItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md shadow-sm"
              >
                <img
                  src={item.image_url || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Price: ₦{item.price.toLocaleString()}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    Subtotal: ₦{item.subtotal.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary & Place Order */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Order Summary
            </h2>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              Total Items: {updatedItems.length}
            </p>
            <p className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Total: ₦{total.toLocaleString()}
            </p>

            {error && (
              <p className="mb-4 text-red-600 dark:text-red-400 font-semibold">
                {error}
              </p>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-md font-semibold transition"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
