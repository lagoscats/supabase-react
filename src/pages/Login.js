import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // reuse styling

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

    const { error } = await supabase.auth.signInWithPassword({ email, password });

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
        <h2 className="register-title">Login</h2>
        <form className="register-form" onSubmit={handleLogin}>
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

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>

          <p className="register-hint">
            Don't have an account yet?{' '}
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
