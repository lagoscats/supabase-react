// src/pages/VendorPayouts.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

export default function VendorPayouts() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPayouts() {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('vendor_payouts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
          setPayouts([]);
        } else {
          setPayouts(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPayouts();
  }, []);

  if (loading) 
    return <p className="text-center mt-10 text-gray-600">Loading payouts...</p>;
  if (error) 
    return <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>;
  if (payouts.length === 0) 
    return <p className="text-center mt-10 text-gray-700">No payouts found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Vendor Payouts</h1>
      <ul className="divide-y divide-gray-200">
        {payouts.map((payout) => (
          <li key={payout.id} className="py-4 flex justify-between">
            <span>Amount: <strong>${payout.amount.toFixed(2)}</strong></span>
            <span className="text-gray-500">{new Date(payout.created_at).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
