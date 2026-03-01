import React from 'react';

/** Global application footer with legal and version information */
const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <span>© {new Date().getFullYear()} Ministry of Tourism, Government of India</span>
      <span className="footer-divider">·</span>
      <span>v{import.meta.env.VITE_APP_VERSION ?? '1.0.0'}</span>
    </footer>
  );
};

export default Footer;
