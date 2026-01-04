import React from 'react';
import '../styles/global.css';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#151A21',
      padding: '30px 20px',
      textAlign: 'center',
      borderTop: '1px solid #00FF7F',
      marginTop: '50px',
      color: '#B0B0B0',
    }}>
      <p>&copy; 2026 Betting Flash. All rights reserved.</p>
      <p style={{ fontSize: '12px' }}>
        Contact: bettingflash62@gmail.com | Phone: 07071198393
      </p>
      <p style={{ fontSize: '12px', marginTop: '20px' }}>
        Manual settlement only. Admin controls all outcomes.
      </p>
    </footer>
  );
};

export default Footer;
