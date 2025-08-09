import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing listing data
  useEffect(() => {
    async function fetchListing() {
      setLoading(true);
      setError(null);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        setError('You must be logged in');
        setLoading(false);
        return;
      }
      const user_id = userData.user.id;

      const { data, error } = await supabase
        .from('vendor_listing')
        .select('*')
        .eq('id', id)
        .eq('user_id', user_id)
        .single();

      if (error) {
        setError('Listing not found or access denied');
      } else {
        setTitle(data.title);
        setPrice(data.price);
        setDescription(data.description);
      }
      setLoading(false);
    }

    fetchListing();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      setError('You must be logged in');
      setSaving(false);
      return;
    }
    const user_id = userData.user.id;

    // Update the listing, but verify user owns it
    const { error } = await supabase
      .from('vendor_listing')
      .update({
        title,
        price: parseFloat(price),
        description,
      })
      .eq('id', id)
      .eq('user_id', user_id);

    if (error) {
      setError(error.message);
    } else {
      navigate('/vendor-listings');
    }
    setSaving(false);
  };

  if (loading) return <p>Loading listing...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20 }}>
      <h2>Edit Listing</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <button type="submit" disabled={saving} style={{ padding: '10px 20px' }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
