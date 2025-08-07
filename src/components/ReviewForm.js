import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import './ReviewForm.css';

export default function ReviewForm({ product_id, onReviewSubmitted }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // Validate inputs
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      setError('Rating must be a number between 1 and 5');
      setSubmitting(false);
      return;
    }

    try {
      // Get logged-in user
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
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Leave a Review</h3>
      <label>
        Rating (1-5):
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write something about this product..."
        />
      </label>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}
