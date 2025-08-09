// src/pages/VendorDashboard.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import './VendorDashboard.css';

export default function VendorDashboard() {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingVendor, setLoadingVendor] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) {
          setLoadingVendor(false);
          return;
        }

        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        setVendor(data);
      } catch (error) {
        console.error('Error fetching vendor:', error);
      } finally {
        setLoadingVendor(false);
      }
    };

    fetchVendor();
  }, []);

  useEffect(() => {
    if (!vendor) return;

    const fetchProducts = async () => {
      setLoadingProducts(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendor.user_id) // Make sure vendor.user_id is UUID
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Products fetch error:', error);
      } else {
        setProducts(data);
      }
      setLoadingProducts(false);
    };

    fetchProducts();
  }, [vendor]);

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price ? product.price.toString() : '',
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
    });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (!vendor || !vendor.user_id) {
      alert('Vendor not found or invalid');
      return;
    }

    setSaving(true);

    try {
      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
          })
          .eq('id', editingProduct.id);

        if (error) throw error;

        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? {
                  ...p,
                  name: formData.name,
                  description: formData.description,
                  price: parseFloat(formData.price),
                }
              : p
          )
        );
        alert('Product updated successfully!');
      } else {
        // Insert new product
        const { data, error } = await supabase
          .from('products')
          .insert([
            {
              vendor_id: vendor.user_id,
              name: formData.name,
              description: formData.description,
              price: parseFloat(formData.price),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        setProducts((prev) => [data, ...prev]);
        setFormData({ name: '', description: '', price: '' }); // Clear form after add
        setEditingProduct(null);
        alert('Product added successfully!');
      }
    } catch (error) {
      alert('Error saving product: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('Error deleting product: ' + error.message);
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert('Product deleted successfully!');
    }
  };

  if (loadingVendor) return <p className="loading-text">Loading vendor info...</p>;
  if (!vendor) return <p>No vendor profile found.</p>;

  return (
    <div className="vendor-dashboard-container">
      <h1>Vendor Dashboard</h1>
      <p className="vendor-name">Welcome, {vendor.name}!</p>

      <section>
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form className="product-form" onSubmit={handleSaveProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleFormChange}
            rows={3}
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₦)"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleFormChange}
            required
          />
          <div>
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            {editingProduct && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2>Your Products</h2>
        {loadingProducts ? (
          <p className="loading-text">Loading products...</p>
        ) : products.length === 0 ? (
          <p>You have not added any products yet.</p>
        ) : (
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id}>
                <div className="product-info">
                  <strong>{product.name}</strong>
                  <small>{product.description}</small>
                  <small>₦{product.price?.toFixed(2)}</small>
                </div>
                <div className="product-actions">
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
