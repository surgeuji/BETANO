import React from 'react';
import { adminLogout, getAdminRole } from '../api/adminAuthAPI';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = getAdminRole();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Role: <span style={{ color: '#FFD700' }}>{role}</span></p>
      <div className="card">
        <h2>Welcome to Admin Control Panel</h2>
        <p>Select an action from the sidebar to begin.</p>
        <button onClick={handleLogout} style={{
          backgroundColor: '#FF3B3B',
          color: '#FFFFFF',
          padding: '10px 20px',
          borderRadius: '14px',
        }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
