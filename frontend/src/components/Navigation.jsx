import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getToken } from '../api/authAPI';
import '../styles/navbar.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = !!getToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">⚡</span>
            BETANO
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            {isAuthenticated && (
              <>
                <Link to="/" className="navbar-link">Dashboard</Link>
                <Link to="/sports" className="navbar-link">Sports</Link>
                <Link to="/casino" className="navbar-link">Casino</Link>
                <Link to="/virtual" className="navbar-link">Virtual</Link>
                <Link to="/money" className="navbar-link">My Money</Link>
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="navbar-actions">
            {isAuthenticated ? (
              <>
                <button className="btn-navbar-primary" onClick={() => navigate('/money')}>
                  Wallet
                </button>
                <button className="btn-navbar-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-navbar-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-navbar-primary">
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {isAuthenticated && (
              <>
                <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/sports" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Sports</Link>
                <Link to="/casino" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Casino</Link>
                <Link to="/virtual" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Virtual</Link>
                <Link to="/money" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>My Money</Link>
                <button className="mobile-link-btn" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
