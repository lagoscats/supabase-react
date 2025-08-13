import { useState, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase/client';
import FallbackImage from '../components/FallbackImage';
import ReviewsSection from '../components/ReviewsSection';

export default function ProductPage() {
  const { id: productId } = useParams(); // renamed for clarity
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) console.error('Error fetching product:', error);
      else setProduct(data);
    };

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchProduct();
    fetchUser();
  }, [productId]);

  if (!product)
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-300 text-lg">
        Loading product...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <FallbackImage
            src={product.image_url}
            alt={product.title}
            fallback="https://picsum.photos/500"
            className="rounded-lg object-contain max-h-[400px] w-full"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <Link
            to="/products"
            className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 font-semibold"
          >
            ← Back to Products
          </Link>

          <h1 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">
            {product.title}
          </h1>

          <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
            {product.description}
          </p>

          <p className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            ₦{product.price}
          </p>

          {/* Reviews Section includes ReviewForm and ReviewList */}
          <ReviewsSection productId={productId} user={user} />
        </div>
      </div>
    </div>
  );
}
