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

  // All admin pages - role-based access handled on pages themselves
  const adminPages = [
    { section: 'DASHBOARD', pages: [
      { path: '/admin/dashboard', label: '📊 Dashboard', icon: '📊' }
    ]},
    { section: 'USERS & CONTROL', pages: [
      { path: '/admin/users', label: '👥 Manage Users', icon: '👥' },
      { path: '/admin/open-bets', label: '🎯 Open Bets', icon: '🎯' },
      { path: '/admin/settled-bets', label: '✅ Settled Bets', icon: '✅' },
    ]},
    { section: 'GAMES', pages: [
      { path: '/admin/virtual-games', label: '⚽ Virtual Games', icon: '⚽' },
      { path: '/admin/casino-games', label: '🎰 Casino Games', icon: '🎰' },
    ]},
    { section: 'MANAGEMENT', pages: [
      { path: '/admin/wallets', label: '💰 Wallet Control', icon: '💰' },
      { path: '/admin/deposits', label: '📥 Deposits', icon: '📥' },
      { path: '/admin/withdrawals', label: '📤 Withdrawals', icon: '📤' },
      { path: '/admin/booking-codes', label: '🎫 Booking Codes', icon: '🎫' },
      { path: '/admin/transactions', label: '📋 Transactions', icon: '📋' },
    ]}
  ];

  return (
    <div className="sidebar">
      <h2 style={{ color: '#00FF7F', marginBottom: '10px' }}>⚡ BETANO ADMIN</h2>
      <p style={{ color: '#FFD700', marginBottom: '20px', fontSize: '12px' }}>Role: {role}</p>

      {adminPages.map((section) => (
        <div key={section.section} style={{ marginBottom: '25px' }}>
          <p style={{ color: '#00FF7F', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
            {section.section}
          </p>
          {section.pages.map((page) => (
            <a
              key={page.path}
              href={page.path}
              className={location.pathname === page.path ? 'active' : ''}
              style={{ 
                marginBottom: '8px', 
                display: 'block',
                padding: '8px 10px',
                borderRadius: '6px',
                color: location.pathname === page.path ? '#FFD700' : '#aaa',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              {page.label}
            </a>
          ))}
        </div>
      ))}

      <button
        onClick={handleLogout}
        style={{
          width: '100%',
          backgroundColor: '#FF3B3B',
          color: '#FFFFFF',
          padding: '10px',
          marginTop: '30px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
