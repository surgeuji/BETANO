import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="footer-icon">⚡</span>
            BETANO
          </div>
          <p className="footer-desc">Your premier betting experience, built for excellence.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/sports">Sports Betting</a></li>
            <li><a href="/casino">Casino</a></li>
            <li><a href="/virtual">Virtual Games</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><a href="mailto:support@betano.com">Email Support</a></li>
            <li><a href="tel:+234707119839">Call Us</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p className="footer-contact">
            <strong>Email:</strong> bettingflash62@gmail.com<br/>
            <strong>Phone:</strong> +234 707 119 839<br/>
            <strong>Available:</strong> 24/7
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 BETANO. All rights reserved.</p>
        <p className="footer-disclaimer">18+ | Bet Responsibly | Manual Settlement</p>
      </div>
    </footer>
  );
};

export default Footer;
