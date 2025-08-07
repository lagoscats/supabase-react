import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import './ReviewList.css';

export default function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (!error) {
        setReviews(data);
      } else {
        console.error('Failed to load reviews:', error);
      }
      setLoading(false);
    };

    fetchReviews();
  }, [productId]); // ✅ Safe dependency

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < count ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className="review-list">
      <h4>Customer Reviews</h4>
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="stars">{renderStars(review.rating)}</div>
          <p className="comment">{review.comment}</p>
          <p className="timestamp">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
