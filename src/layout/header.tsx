import React from 'react';
import { useAuth } from '../hooks/useAuth';

/** Top header bar — displays breadcrumb, notifications, and user profile */
const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="app-header">
      <div className="header-breadcrumb">
        <span className="header-system-name">SafeTrail</span>
        <span className="header-separator">/</span>
        <span className="header-page-name">Dashboard</span>
      </div>

      <div className="header-controls">
        {/* Notification bell */}
        <button className="header-icon-btn" aria-label="Notifications">
          🔔
        </button>

        {/* User info + sign out */}
        {user && (
          <div className="header-user">
            <div className="header-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="header-user-info">
              <span className="header-user-name">{user.name}</span>
              <span className="header-user-role">{user.role}</span>
            </div>
            <button className="header-icon-btn" onClick={signOut} aria-label="Sign out">
              ↩
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
