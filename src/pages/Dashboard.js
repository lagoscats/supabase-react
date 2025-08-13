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

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <p className="text-red-600 dark:text-red-400 text-lg font-semibold">
          ⚠️ You must be logged in to view this page.
        </p>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Vendor Dashboard</h1>
        </div>
        <nav className="flex flex-col p-4 space-y-3">
          <button onClick={() => navigate('/dashboard')} className="text-left hover:text-blue-600 dark:hover:text-blue-400">🏠 Overview</button>
          <button onClick={() => navigate('/dashboard/manage-products')} className="text-left hover:text-blue-600 dark:hover:text-blue-400">📦 Manage Products</button>
          <button onClick={() => navigate('/dashboard/orders')} className="text-left hover:text-blue-600 dark:hover:text-blue-400">🛒 Orders</button>
          <button onClick={() => navigate('/dashboard/settings')} className="text-left hover:text-blue-600 dark:hover:text-blue-400">⚙️ Settings</button>
          <button onClick={handleLogout} className="text-left text-red-600 hover:text-red-700">🚪 Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=random`}
              alt="User Avatar"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.email}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Member since {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => navigate('/dashboard/manage-products')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg shadow"
          >
            ➕ Add New Product
          </button>
          <button
            onClick={() => navigate('/dashboard/orders')}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg shadow"
          >
            📦 View Orders
          </button>
          <button
            onClick={() => navigate('/dashboard/settings')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg shadow"
          >
            ⚙️ Account Settings
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="text-gray-700 dark:text-gray-300">✅ Product "Blue Sneakers" added - 2 days ago</li>
            <li className="text-gray-700 dark:text-gray-300">📦 Order #1023 shipped - 5 days ago</li>
            <li className="text-gray-700 dark:text-gray-300">🛒 New order received - 1 week ago</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
