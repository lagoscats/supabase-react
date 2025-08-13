import React, { useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Package, LogOut, PlusCircle, ListOrdered, User } from 'lucide-react';

export default function Dashboard() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-blue-600">Vendor Dashboard</h2>
          <button
            className="md:hidden text-gray-500 dark:text-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          <button
            onClick={() => navigate('/dashboard/manage-products')}
            className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Package size={18} /> Manage Products
          </button>
          <button
            onClick={() => navigate('/dashboard/add-product')}
            className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <PlusCircle size={18} /> Add Product
          </button>
          <button
            onClick={() => navigate('/dashboard/orders')}
            className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ListOrdered size={18} /> View Orders
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile topbar */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow-md md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 dark:text-gray-400"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-bold text-blue-600">Dashboard</h2>
        </div>

        {/* Content */}
        <main className="p-6 space-y-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {session.user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {session.user.email}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Vendor since 2025
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/dashboard/add-product')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg shadow flex flex-col items-center"
              >
                <PlusCircle size={28} />
                <span className="mt-2">Add Product</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/manage-products')}
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg shadow flex flex-col items-center"
              >
                <Package size={28} />
                <span className="mt-2">Manage Products</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/orders')}
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg shadow flex flex-col items-center"
              >
                <ListOrdered size={28} />
                <span className="mt-2">View Orders</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Recent Activity
            </h3>
            <ul className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
              <li className="p-4">🛒 Order #1234 placed - ₦9,500</li>
              <li className="p-4">📦 Product "Chymoral" updated</li>
              <li className="p-4">✅ Payment received for Order #1229</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
