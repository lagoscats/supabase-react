// src/pages/VendorListings.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { Link } from 'react-router-dom';

export default function VendorListings() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, error } = await supabase
          .from('vendor_listings')  // Adjust table name if different
          .select('*');
        if (error) throw error;
        setVendors(data);
      } catch (err) {
        setError('Failed to load vendors: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading vendors...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Vendor Listings</h1>
      {vendors.length === 0 ? (
        <p>No vendors found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vendors.map((vendor) => (
            <li
              key={vendor.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{vendor.name}</h2>
              <p className="mb-2">Location: {vendor.location || 'N/A'}</p>
              <Link
                to={`/vendor/${vendor.id}`}
                className="text-blue-600 hover:underline"
              >
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
