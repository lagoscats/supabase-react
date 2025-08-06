import React from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!session)
    return (
      <div className="dashboard-container">
        <p className="login-warning">⚠️ You must be logged in to view this page.</p>
      </div>
    );

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome, <span className="email">{session.user.email}</span></h2>
        <p>You are logged in with Supabase Auth.</p>

        <div className="dashboard-actions">
          <button className="dashboard-btn logout" onClick={handleLogout}>
            Logout
          </button>
          <button
            className="dashboard-btn manage"
            onClick={() => navigate('/dashboard/manage-products')}
>            Manage Products
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
