import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const fallbackImage = 'https://via.placeholder.com/300x200.png?text=No+Image';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, clearCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Failed to fetch products:', error.message);
      else setProducts(data || []);
      setLoading(false);
    };

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Browse Products</h2>

      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-8"
      />

      {loading ? (
        <p className="text-gray-700 text-center text-lg">Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No matching products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <Link to={`/product/${product.id}`} className="block overflow-hidden">
                <img
                  src={product.image_url || fallbackImage}
                  alt={product.name || 'Product'}
                  className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
                  onError={(e) => {
                    if (e.target.src !== fallbackImage) {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }
                  }}
                />
              </Link>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name || product.title}</h3>
                <p className="text-blue-600 font-bold text-xl mb-4">₦{product.price}</p>

                <div className="mt-auto flex space-x-3">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-md transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
