// src/components/ReviewForm.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ReviewForm({ productId, user, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!productId || !user) return;

    setLoading(true);

    const { error } = await supabase
      .from('reviews')
      .insert([
        {
          product_id: product_Id,  // Must be uuid from products table
          user_id: user.id,       // Must be uuid from auth
          rating: Number(rating),
          comment,
        }
      ]);

    setLoading(false);

    if (error) {
      console.error('Review submission error:', error.message);
      alert('Error submitting review: ' + error.message);
    } else {
      setComment('');
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    }
  };

  return (
    <form onSubmit={submitReview} className="review-form">
      <h4>Write a Review</h4>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>

      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
