import React, { useEffect, useState } from 'react';
import './ManageProducts.css';

import {
  fetchUser,
  fetchUserProducts,
  updateProduct,
  insertProduct,
  deleteProduct,
} from '../api/products';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    image_url: ''
  });

  const placeholderImage = 'https://picsum.photos/100';

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const user = await fetchUser();
      const userProducts = await fetchUserProducts(user.id);
      setProducts(userProducts);
    } catch (err) {
      console.error('Error loading products:', err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = await fetchUser(); // ✅ get logged-in user

    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image_url: formData.image_url,
      user_id: user?.id,
    };

    if (formData.id) {
      await updateProduct({ id: formData.id, ...newProduct });
      alert('Product updated!');
    } else {
      await insertProduct(newProduct);
      alert('Product added!');
    }

    setFormData({ id: null, name: '', description: '', price: '', image_url: '' });
    loadProducts();
  } catch (error) {
    console.error('Submission failed:', error.message);
    alert('Submission failed: ' + error.message);
  }
};


  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      image_url: product.image_url || '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="manage-products-container">
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price (₦)" value={formData.price} onChange={handleChange} required />
        <input name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} />
        <button type="submit">{formData.id ? 'Update Product' : 'Add Product'}</button>
        {formData.id && <button type="button" onClick={() => setFormData({ id: null, name: '', description: '', price: '', image_url: '' })} className="cancel-btn">Cancel</button>}
      </form>

      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url || placeholderImage} alt={product.name} onError={(e) => (e.target.src = placeholderImage)} />
            <h4>{product.name}</h4>
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
