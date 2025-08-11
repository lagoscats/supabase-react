import React, { useEffect, useState } from 'react';
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
      const user = await fetchUser();

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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Manage Products</h2>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="price"
          type="number"
          placeholder="Price (₦)"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            {formData.id ? 'Update Product' : 'Add Product'}
          </button>
          {formData.id && (
            <button
              type="button"
              onClick={() => setFormData({ id: null, name: '', description: '', price: '', image_url: '' })}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
            <img
              src={product.image_url || placeholderImage}
              alt={product.name}
              onError={(e) => (e.target.src = placeholderImage)}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">{product.name}</h4>
            <p className="text-gray-700 dark:text-gray-300 flex-grow">{product.description}</p>
            <p className="mt-2 font-bold text-blue-600 dark:text-blue-400">₦{product.price}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
