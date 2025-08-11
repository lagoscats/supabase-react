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

  if (error)
    return (
      <p className="text-red-600 dark:text-red-400 p-4 text-center font-semibold">
        {error}
      </p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Add Product
      </h2>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium">Product Name</span>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium">Description</span>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          rows={4}
        />
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 dark:text-gray-300 font-medium">Price</span>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-md transition"
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
}
