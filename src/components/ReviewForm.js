import { useState } from 'react';
import { supabase } from '../supabase/client';
import './ReviewForm.css'; // ✅ add this


export default function ReviewForm({ productId, user }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      setMessage('Rating and comment are required.');
      return;
    }

    const review = {
      product_id: productId,
      user_id: user.id,
      rating,
      comment: comment.trim(),
    };

    console.log('Submitting review:', review);

    setLoading(true);
    setMessage('');

    const { error } = await supabase.from('reviews').insert([review]);

    if (error) {
      console.error('Insert error:', error);
      setMessage('Error submitting review: ' + error.message);
    } else {
      setMessage('Review submitted!');
      setRating(5);
      setComment('');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

      {message && <p className="text-sm text-red-600 mb-2">{message}</p>}
      {loading && <p className="text-sm text-blue-500 mb-2">Submitting...</p>}

      <label className="block mb-2">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="ml-2"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && 's'}
            </option>
          ))}
        </select>
      </label>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your comment..."
        className="w-full p-2 border rounded mb-2"
        rows={3}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Review
      </button>
    </form>
  );
}
