// src/pages/VendorProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

const VendorProfile = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchVendor() {
      setLoading(true);
      setError('');

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        navigate("/login");
        return;
      }

      const { data, error: vendorError } = await supabase
        .from("vendors")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (vendorError) {
        if (vendorError.code === "PGRST116") {
          setError("No vendor profile found. Redirecting...");
          setTimeout(() => navigate("/become-vendor"), 2000);
        } else {
          setError("Error fetching vendor profile: " + vendorError.message);
        }
      } else {
        setVendor(data);
      }
      setLoading(false);
    }

    fetchVendor();
  }, [navigate]);

  if (loading) return <p>Loading vendor profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!vendor) return null;

  return (
    <div className="vendor-profile-container" style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>{vendor.name}</h1>
      <p><strong>Location:</strong> {vendor.location}</p>
      <p><strong>Phone:</strong> {vendor.phone || 'N/A'}</p>
      <p><strong>Description:</strong> {vendor.description || 'No description provided.'}</p>
    </div>
  );
};

export default VendorProfile;
