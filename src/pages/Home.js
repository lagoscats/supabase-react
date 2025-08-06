import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { Link } from 'react-router-dom';
import './Home.css';

const fallbackImage = 'https://via.placeholder.com/150?text=No+Image';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          if (!hasFetched) {
            console.error('Error fetching products:', error.message);
            setError('Failed to fetch products.');
            setHasFetched(true);
          }
        } else {
          setProducts(data || []);
          setError(null);
        }
      } catch (err) {
        if (!hasFetched) {
          console.error('Unexpected error:', err.message);
          setError('An unexpected error occurred.');
          setHasFetched(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [hasFetched]);

  const filteredProducts = products.filter((product) =>
    (product.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description || '').toLowerCase().includes(searchTerm.toLowerCase())
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
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && filteredProducts.length === 0 && (
        <p>No matching products found.</p>
      )}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <img
              src={product.image_url || fallbackImage}
              alt={product.title}
              className="product-image"
              onError={(e) => {
                if (e.target.src !== fallbackImage) {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = fallbackImage;
                }
              }}
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">₦{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
