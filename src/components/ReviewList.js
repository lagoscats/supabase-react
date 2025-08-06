// components/ReviewList.js
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import './ReviewList.css';


export default function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from('reviews')
        .select('*, users(username)')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (data) setReviews(data);
    }

    fetchReviews();
  }, [productId]);

  return (
  <div className="review-list">
    <h3>Reviews</h3>
    {reviews.length === 0 ? (
      <p>No reviews yet.</p>
    ) : (
      reviews.map((rev) => (
        <div key={rev.id} className="review-card">
          <p className="review-username">{rev.users?.username || 'Anonymous'}</p>
          <p className="review-stars">{'⭐'.repeat(rev.rating)}</p>
          <p className="review-comment">{rev.comment}</p>
          <p className="review-date">
            {new Date(rev.created_at).toLocaleDateString()}
          </p>
        </div>
      ))
    )}
  </div>
  );
}