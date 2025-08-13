import React, { useState } from 'react';
import { supabase } from '../supabase/client';

export default function ReviewForm({ product_id, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Simple regex to check UUID format
  const isValidUUID = (str) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!product_id) {
      setErrorMsg('Product ID is missing.');
      return;
    }

    if (!isValidUUID(product_id)) {
      setErrorMsg(`Invalid product ID format: ${product_id}`);
      console.error('Expected UUID, got:', product_id, typeof product_id);
      return;
    }

    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      setErrorMsg('You must be logged in to submit a review.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('reviews')
      .insert([
        {
          product_id,      // ✅ Guaranteed UUID
          user_id: user.id, // Also UUID
          rating,
          comment
        }
      ]);

    if (error) {
      console.error('Error submitting review:', error);
      setErrorMsg('Failed to submit review.');
    } else {
      setComment('');
      setRating(5);
      if (onReviewSubmitted) onReviewSubmitted();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      <label className="block">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="ml-2 border p-1 rounded"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
