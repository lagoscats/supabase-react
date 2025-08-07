import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Reused styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Login to SupaLink</h2>
        <form className="register-form" onSubmit={handleLogin} autoComplete="on">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="register-input"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="register-input"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="register-error">{error}</p>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>

          <p className="register-hint">
            Don’t have an account?{' '}
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
