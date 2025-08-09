import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [vendor, setVendor] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVendor() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        navigate('/login');
        return;
      }
      const user_id = userData.user.id;
      const { data: vendorData, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user_id)
        .single();

      if (error || !vendorData) {
        setError('You must register as a vendor first.');
      } else {
        setVendor(vendorData);
      }
    }
    fetchVendor();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendor) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase.from('products').insert([
      {
        vendor_id: vendor.id,
        name,
        description,
        price: parseFloat(price),
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      navigate('/vendor-dashboard');
    }
    setLoading(false);
  };

  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
        min="0"
        step="0.01"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
}
