import React, { useState } from 'react';
import { supabase } from '../supabase/client';

export default function ReviewForm({ product_id, onReviewSubmitted }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      setError('Rating must be a number between 1 and 5');
      setSubmitting(false);
      return;
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      const { error: insertError } = await supabase.from('reviews').insert([
        {
          product_id,
          user_id: user.id,
          rating: parseInt(rating),
          comment,
        },
      ]);

      if (insertError) throw insertError;

      alert('Review submitted!');
      setRating('');
      setComment('');
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      console.error('Review submission error:', err.message);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-full"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Leave a Review
      </h3>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Rating (1-5):
        </span>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium">Comment:</span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write something about this product..."
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </label>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-md transition"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
