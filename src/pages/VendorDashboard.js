import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';
import './VendorDashboard.css';

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [vendorName, setVendorName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVendorProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: vendor } = await supabase
        .from('vendors')
        .select('id, name')
        .eq('user_id', user.id)
        .single();

      if (vendor?.id) {
        setVendorName(vendor.name || 'My Shop');
        setTimeout(() => {
          navigate(`/vendor/${vendor.id}`);
        }, 1500); // short delay so dashboard UI is visible
      }

      setLoading(false);
    };

    getVendorProfile();
  }, [navigate]);

  return (
    <div className="vendor-dashboard">
      <header className="vendor-header">
        <h1>Vendor Dashboard</h1>
        <p>Manage your SupaLink shop with ease 🚀</p>
      </header>

      <div className="vendor-stats">
        <div className="vendor-card">
          <h2>Welcome</h2>
          <p>{vendorName}</p>
        </div>
        <div className="vendor-card">
          <h2>Products</h2>
          <p>--</p>
        </div>
        <div className="vendor-card">
          <h2>Orders</h2>
          <p>--</p>
        </div>
        <div className="vendor-card">
          <h2>Earnings</h2>
          <p>₦ --</p>
        </div>
      </div>

      <footer className="vendor-footer">
        {loading ? (
          <p>Loading your profile...</p>
        ) : (
          <p>Redirecting to your vendor profile...</p>
        )}
      </footer>
    </div>
  );
}
