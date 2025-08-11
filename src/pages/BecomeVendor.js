import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

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

      // Check if user already has a vendor profile
      const { data: existingVendor, error: checkError } = await supabase
        .from('vendor_listings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingVendor) {
        navigate(`/vendor-dashboard/${existingVendor.id}`);
        return;
      }

      // Insert new vendor profile
      const { data, error: insertError } = await supabase
        .from('vendor_listings')
        .insert([{ user_id: user.id, name, location }])
        .select()
        .single();

      if (insertError) throw insertError;

      navigate(`/dashboard/vendor/${data.id}`);
    } catch (err) {
      console.error(err);
      setError('Error creating vendor profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Become a Vendor</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
        )}

        <label className="block">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Vendor Name:</span>
          <input
            type="text"
            placeholder="Enter your shop name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Location:</span>
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-md transition"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
