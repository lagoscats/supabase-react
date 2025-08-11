// src/pages/VendorDashboard.js
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ sales: 0, orders: 0, products: 0, pending: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (!error && data) {
      setProducts(data);
      setStats(prev => ({ ...prev, products: data.length }));
    }
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("orders").select("*");
    if (!error && data) {
      setOrders(data);
      const totalSales = data.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      const pendingOrders = data.filter(o => o.status === "pending").length;
      setStats(prev => ({ ...prev, orders: data.length, sales: totalSales, pending: pendingOrders }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-4 text-xl font-bold border-b">Vendor Panel</div>
        <nav className="p-4 space-y-4">
          <button onClick={() => navigate("/vendor-dashboard")} className="block w-full text-left hover:text-blue-500">Dashboard</button>
          <button onClick={() => navigate("/vendor/products")} className="block w-full text-left hover:text-blue-500">Products</button>
          <button onClick={() => navigate("/vendor/orders")} className="block w-full text-left hover:text-blue-500">Orders</button>
          <button className="block w-full text-left text-red-500 hover:underline">Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Sales" value={`₦${stats.sales.toLocaleString()}`} />
          <StatCard title="Total Orders" value={stats.orders} />
          <StatCard title="Total Products" value={stats.products} />
          <StatCard title="Pending Orders" value={stats.pending} />
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Order ID</th>
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Total</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.product_name}</td>
                  <td className="p-2">{o.quantity}</td>
                  <td className="p-2">₦{(o.total_amount || 0).toLocaleString()}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${o.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Products */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">Your Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                <img src={p.image_url} alt={p.name} className="h-40 w-full object-cover rounded-lg mb-2" />
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-gray-600">₦{p.price.toLocaleString()}</p>
                <div className="flex justify-between mt-3">
                  <button onClick={() => navigate(`/edit-product/${p.id}`)} className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => navigate("/add-product")}
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg text-lg"
        >
          +
        </button>
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
