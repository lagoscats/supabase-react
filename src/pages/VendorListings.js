// src/pages/VendorListings.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { Link } from 'react-router-dom';

export default function VendorListings() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVendors() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('*');

        if (error) {
          setError(error.message);
          setVendors([]);
        } else {
          setVendors(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVendors();
  }, []);

  if (loading) return <p>Loading vendors...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (vendors.length === 0) return <p>No vendors found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Vendors</h1>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id}>
            <Link to={`/vendor/${vendor.id}`}>{vendor.name}</Link> — {vendor.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
