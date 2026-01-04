import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminLogout, getAdminRole, canAccessPage } from '../api/adminAuthAPI';
import '../styles/global.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = getAdminRole();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  // Define accessible pages for each role
  const financePages = [
    { path: '/admin/deposits', label: 'Manage Deposits' },
    { path: '/admin/withdrawals', label: 'Manage Withdrawals' },
    { path: '/admin/wallets', label: 'Manage Wallets' },
  ];

  const operationsPages = [
    { path: '/admin/bets', label: 'Settle Bets' },
    { path: '/admin/casino', label: 'Manage Casino' },
  ];

  const supportPages = []; // Read-only, no action buttons on pages

  let accessiblePages = [];
  if (role === 'SUPER_ADMIN') {
    accessiblePages = [...financePages, ...operationsPages];
  } else if (role === 'FINANCE_ADMIN') {
    accessiblePages = financePages;
  } else if (role === 'OPERATIONS_ADMIN') {
    accessiblePages = operationsPages;
  } else if (role === 'SUPPORT_ADMIN') {
    accessiblePages = supportPages;
  }

  return (
    <div className="sidebar">
      <h2 style={{ color: '#00FF7F', marginBottom: '20px' }}>ADMIN</h2>
      <p style={{ color: '#FFD700', marginBottom: '20px' }}>Role: {role}</p>

      <a
        href="/admin/dashboard"
        className={location.pathname === '/admin/dashboard' ? 'active' : ''}
        style={{ marginBottom: '10px' }}
      >
        Dashboard
      </a>

      {accessiblePages.map((page) => (
        <a
          key={page.path}
          href={page.path}
          className={location.pathname === page.path ? 'active' : ''}
          style={{ marginBottom: '10px' }}
        >
          {page.label}
        </a>
      ))}

      <button
        onClick={handleLogout}
        style={{
          width: '100%',
          backgroundColor: '#FF3B3B',
          color: '#FFFFFF',
          padding: '10px',
          marginTop: '20px',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
