import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 4000);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create an Account</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">✅ Check your email to verify. Redirecting...</p>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
