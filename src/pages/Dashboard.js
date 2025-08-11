import React from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!session)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <p className="text-red-600 dark:text-red-400 text-lg font-semibold">
          ⚠️ You must be logged in to view this page.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Welcome,{' '}
          <span className="text-blue-600 dark:text-blue-400 font-mono">
            {session.user.email}
          </span>
        </h2>
        <p className="mb-8 text-gray-700 dark:text-gray-300">
          You are logged in with Supabase Auth.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
          >
            Logout
          </button>
          <button
            onClick={() => navigate('/dashboard/manage-products')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Manage Products
          </button>
        </div>
      </div>
    </div>
  );
}
