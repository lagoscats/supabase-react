// pages/VendorProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/client';
import './VendorProfile.css';

export default function VendorProfile() {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchVendor = async () => {
      const { data } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', vendorId)
        .single();
      if (data) setVendor(data);
    };

    const fetchListings = async () => {
      const { data } = await supabase
        .from('vendor_listings')
        .select('*')
        .eq('vendor_id', vendorId);
      if (data) setListings(data);
    };

    fetchVendor();
    fetchListings();
  }, [vendorId]);

  if (!vendor) return <p>Loading vendor...</p>;

  return (
    <div className="vendor-profile">
      <h2>{vendor.name}</h2>
      <p>{vendor.location}</p>
      <p>{vendor.bio}</p>
      <a href={listings.affiliate_link} target="_blank" rel="noopener noreferrer">Buy Now</a>

      <h3>Listings</h3>
      <div className="listing-grid">
        {listings.map(listing => (
          <div key={listing.id} className="listing-card">
            <img src={listing.image_url} alt={listing.title} />
            <h4>{listing.title}</h4>
            <p>From ₦{listing.price}</p>
            <p>Delivery: {listing.delivery_days} days</p>
            <a href={listing.affiliate_link} target="_blank" rel="noopener noreferrer">Buy Now</a>
        </div>
        ))}
      </div>
    </div>
  );
}
