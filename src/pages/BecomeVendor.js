// src/pages/BecomeVendor.js
import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import './BecomeVendor.css';

export default function BecomeVendor() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be signed in to become a vendor.');
        setLoading(false);
        return;
      }

      // ✅ Check if user already has a vendor profile
      const { data: existingVendor, error: checkError } = await supabase
        .from('vendor_listings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingVendor) {
        // Redirect if profile already exists
        navigate(`/vendor-dashboard/${existingVendor.id}`);
        return;
      }

      // ✅ Insert new vendor profile
      const { data, error: insertError } = await supabase
        .from('vendor_listings')
        .insert([
          {
            user_id: user.id,
            name,
            location,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // ✅ Redirect to vendor dashboard after creation
      navigate(`/dashboard/vendor/${data.id}`);


    } catch (err) {
      console.error(err);
      setError('Error creating vendor profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="become-vendor-container">
      <h2>Become a Vendor</h2>
      <form onSubmit={handleSubmit} className="vendor-form">
        {error && <p className="error">{error}</p>}

        <label>Vendor Name:</label>
        <input
          type="text"
          placeholder="Enter your shop name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Location:</label>
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
