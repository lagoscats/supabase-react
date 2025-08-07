import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';

import './BecomeVendor.css'; // Import the CSS

export default function BecomeVendor() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('You must be logged in');

      let avatarPath = '';
      if (file) {
        const { data, error } = await supabase.storage
          .from('profile-photos')
          .upload(`vendors/${user.id}-${Date.now()}`, file);

        if (error) throw error;
        avatarPath = data.path;
      }

      const { error: insertError } = await supabase.from('vendors').insert({
        user_id: user.id,
        name,
        location,
        bio,
        avatar_url: avatarPath,
      });

      if (insertError) throw insertError;

      setSuccess(true);
      setName('');
      setLocation('');
      setBio('');
      setFile(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const [user, setUser] = useState(null);

useEffect(() => {
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data?.user || null);
  };
  getUser();
}, []);

if (!user) {
  return (
    <div className="vendor-container">
      <h2>🧵 Become a Vendor</h2>
      <p>You must <a href="/login">log in</a> to access this page.</p>
    </div>
  );
}

  return (
    <div className="vendor-container">
      <h2>🧵 Become a Vendor</h2>
      {success && <p className="success-text">Vendor profile created successfully!</p>}
      <form onSubmit={handleSubmit} className="vendor-form">
        <input
          type="text"
          placeholder="Tailor Name or Business"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Bio (what you specialize in...)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
