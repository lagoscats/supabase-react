import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductsPage.css';

const fallbackImage = 'https://via.placeholder.com/300x200.png?text=No+Image';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const { addToCart, clearCart } = useCart();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Failed to fetch products:', error.message);
      else setProducts(data || []);
      setLoading(false);
    };

    fetchUser();
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuyNow = (product) => {
    clearCart();
    addToCart(product);
    navigate('/cart');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`"${product.name}" added to cart!`);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Failed to delete product:', error.message);
      alert('Error deleting product.');
    } else {
      setProducts(products.filter((p) => p.id !== productId));
      alert('Product deleted successfully.');
    }
  };

  return (
    <div className="products-container">
      <h2 className="products-header">Browse Products</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="empty-text">No matching products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <img
                  src={product.image_url || fallbackImage}
                  alt={product.name || 'Product'}
                  className="product-image"
                  onError={(e) => {
                    if (e.target.src !== fallbackImage) {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }
                  }}
                />
              </Link>

              <div className="product-info">
                <h3 className="product-name">{product.title}</h3>
                <p className="product-price">₦{product.price}</p>
              </div>

              <div className="product-actions">
                <button className="buy-now-button" onClick={() => handleBuyNow(product)}>
                  Buy Now
                </button>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>

                {/* Show delete button only if user owns this product */}
                {user?.id === product.user_id && (
                  <button className="delete-button" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
