import React from 'react';

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-600 italic">No reviews yet</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map(({ id, rating, comment, created_at }) => (
        <div key={id} className="border-b border-gray-200 pb-4 last:border-b-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex space-x-1 text-yellow-400">
              {[...Array(rating)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.963c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.37 2.447c-.783.57-1.838-.196-1.538-1.118l1.287-3.963a1 1 0 00-.364-1.118L3.644 9.39c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.962z" />
                </svg>
              ))}
            </div>
            <time
              dateTime={created_at}
              className="text-gray-400 text-sm"
              title={new Date(created_at).toLocaleString()}
            >
              {new Date(created_at).toLocaleDateString()}
            </time>
          </div>
          <p className="text-gray-800">{comment}</p>
        </div>
      ))}
    </div>
  );
}
