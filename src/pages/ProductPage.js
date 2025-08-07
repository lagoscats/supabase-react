import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase/client';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import FallbackImage from '../components/FallbackImage';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error('Error fetching product:', error);
      else setProduct(data);
    };

    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchProduct();
    fetchUser();
  }, [id]);

  if (!product) return <p className="loading-text">Loading product...</p>;

  return (
  <div className="product-page">
    <div className="product-container">
      <div className="product-image-wrapper">
        <FallbackImage
          src={product.image_url}
          alt={product.title}
          className="product-image"
          fallback="https://picsum.photos/300"
        />
      </div>

      <div className="product-info">
        <Link to="/products" className="back-button">← Back to Products</Link>
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">₦{product.price}</p>

        {user && <ReviewForm productId={product.id} user={user} />}
        <ReviewList productId={product.id} />
      </div>
    </div>
  </div>
  );
}

