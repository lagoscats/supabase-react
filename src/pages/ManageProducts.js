import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import './ManageProducts.css';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    price: '',
    image_url: ''
  });

  const placeholderImage =  'https://picsum.photos/100';

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    if (formData.id) {
      await supabase.from('products').update(payload).eq('id', formData.id);
    } else {
      await supabase.from('products').insert([payload]);
    }

    setFormData({ id: null, title: '', description: '', price: '', image_url: '' });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
      image_url: product.image_url || '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  return (
    <div className="manage-products-container">
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price (₦)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />
        <button type="submit">
          {formData.id ? 'Update Product' : 'Add Product'}
        </button>
        {formData.id && (
          <button
            type="button"
            onClick={() => setFormData({ id: null, title: '', description: '', price: '', image_url: '' })}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image_url || placeholderImage}
              alt={product.title}
              onError={(e) => (e.target.src = placeholderImage)}
            />
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <p><strong>₦{product.price}</strong></p>
            <div className="actions">
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)} className="delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
