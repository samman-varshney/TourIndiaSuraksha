import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { SIDEBAR_ITEMS } from './constants';

/** Role-aware navigation sidebar — filters items based on the current user's role */
const Sidebar: React.FC = () => {
  const { role, signOut } = useAuth();

  // Show only items the current role is allowed to see
  const visibleItems = SIDEBAR_ITEMS.filter(
    (item) => role && item.roles.includes(role)
  );

  return (
    <aside className="sidebar">
      {/* Branding */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🛡</div>
        <div>
          <div className="sidebar-logo-text">SafeTrail</div>
          <div className="sidebar-logo-sub">
            {role ? `${role.charAt(0) + role.slice(1).toLowerCase()} Portal` : ''}
          </div>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Navigation</span>
        {visibleItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'sidebar-item--active' : ''}`
            }
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span className="sidebar-item-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="sidebar-footer">
        <button className="sidebar-item" onClick={signOut}>
          <span className="sidebar-item-icon">↩</span>
          <span className="sidebar-item-label">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
