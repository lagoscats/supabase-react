import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

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

      if (!error) setReviews(data);
      else console.error('Failed to load reviews:', error);
      setLoading(false);
    };

    fetchReviews();
  }, [productId]);

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`inline-block text-xl ${
          i < count ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
        aria-hidden="true"
      >
        ★
      </span>
    ));
  };

  if (loading)
    return (
      <p className="text-center text-gray-700 dark:text-gray-300 my-4">Loading reviews...</p>
    );
  if (reviews.length === 0)
    return (
      <p className="text-center text-gray-700 dark:text-gray-300 my-4">No reviews yet.</p>
    );

  return (
    <div className="review-list mt-8 max-w-xl">
      <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Customer Reviews
      </h4>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="review-card bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow"
        >
          <div className="stars mb-2">{renderStars(review.rating)}</div>
          <p className="comment text-gray-800 dark:text-gray-200 mb-2 whitespace-pre-line">
            {review.comment || <i className="text-gray-400">No comment</i>}
          </p>
          <p className="timestamp text-sm text-gray-500 dark:text-gray-400">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
