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
          .select('*');

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

  if (loading) return <p>Loading payouts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (payouts.length === 0) return <p>No payouts found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Vendor Payouts</h1>
      <ul>
        {payouts.map((payout) => (
          <li key={payout.id}>
            Amount: ${payout.amount} — Date: {new Date(payout.created_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
