import React from 'react';

// Simple dynamic SVG logo rendered from team name
const TeamLogo = ({ name, size = 48 }) => {
  const initials = name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
  const bg = '#111217';
  const gold = 'var(--color-gold)';

  return (
    <div style={{ width: size, height: size, display: 'inline-block' }} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`g-${initials}`} x1="0" x2="1">
            <stop offset="0%" stopColor={gold} stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffd46a" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="12" fill={bg} />
        <circle cx="50" cy="36" r="26" fill={`url(#g-${initials})`} opacity="0.95" />
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="Segoe UI, Roboto, Arial" fontWeight="800" fontSize="36" fill="#0B0F14">{initials}</text>
      </svg>
    </div>
  );
};

export default TeamLogo;
