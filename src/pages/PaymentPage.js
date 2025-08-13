import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const total = location.state?.total || 0;

  useEffect(() => {
    // Dynamically load Paystack script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handlePaystackPayment = () => {
    if (!window.PaystackPop) return alert("Paystack script not loaded");

    const handler = window.PaystackPop.setup({
      key: "pk_test_f37948a2f7a2ca81af1fe5cba611ba20fc189f65", // replace with your Paystack public key
      email: "customer@example.com", // ideally, fetch from user session
      amount: total * 100, // Paystack uses kobo
      currency: "NGN",
      ref: `supalink-${Math.floor(Math.random() * 1000000)}`,
      callback: function (response) {
        alert(`Payment successful! Reference: ${response.reference}`);
        // You can redirect to a success page or update order status here
      },
      onClose: function () {
        alert("Payment window closed.");
      },
    });
    handler.openIframe();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white dark:bg-gray-900 rounded shadow">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Payment
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        You are about to pay <strong>₦{total.toLocaleString()}</strong>
      </p>
      <button
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded font-semibold"
        onClick={handlePaystackPayment}
      >
        Pay Now
      </button>
    </div>
  );
}
