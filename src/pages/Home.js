import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  async function fetchProducts() {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Supabase error:', error); // Better error detail
        setProducts([]);
        setError('Failed to fetch products');
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error('Network error:', err); // Will show fetch errors
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }

  fetchProducts();
}, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h2>Available Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {filteredProducts.length > 0 ? (
        filteredProducts.map((p) => (
          <div key={p.id} className="product-card">
            <h3 className="product-title">{p.name}</h3>
            <p className="product-description">{p.description}</p>
            <p className="product-price">₦{p.price}</p>
          </div>
        ))
      ) : (
        !loading && <p>No matching products found.</p>
      )}
    </div>
  );
};

export default Home;
