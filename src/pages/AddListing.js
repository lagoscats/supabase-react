import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

export default function AddListing() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      setError('You must be logged in');
      setLoading(false);
      return;
    }

    const user_id = userData.user.id;

    const { error } = await supabase.from('vendor_listing').insert([
      {
        user_id,
        title,
        price: parseFloat(price),
        description,
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      navigate('/vendor-listings');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20 }}>
      <h2>Add New Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          step="0.01"
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Saving...' : 'Add Listing'}
        </button>
      </form>
    </div>
  );
}
