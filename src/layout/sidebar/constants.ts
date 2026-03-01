import { UserRole } from '../../enums/UserRole';
import { WEB_ROUTES } from '../../routes/webroutes.constants';

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  roles: UserRole[];       // Which roles see this item
  badgeKey?: string;       // Optional Redux state key for notification badge
}

/** All sidebar navigation items keyed by role visibility */
export const SIDEBAR_ITEMS: SidebarItem[] = [
  // Tourist items
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '⊞',
    path: WEB_ROUTES.DASHBOARD,
    roles: [UserRole.TOURIST],
  },
  {
    id: 'profile',
    label: 'My Profile & ID',
    icon: '◉',
    path: WEB_ROUTES.TOURIST_PROFILE,
    roles: [UserRole.TOURIST],
  },
  {
    id: 'chatbot',
    label: 'Safety Assistant',
    icon: '💬',
    path: WEB_ROUTES.CHATBOT,
    roles: [UserRole.TOURIST],
  },

  // Authority items
  {
    id: 'ops',
    label: 'Operations Centre',
    icon: '⊞',
    path: WEB_ROUTES.OPS_CENTER,
    roles: [UserRole.AUTHORITY, UserRole.ADMIN],
  },
  {
    id: 'alerts',
    label: 'Active Alerts',
    icon: '🚨',
    path: WEB_ROUTES.ALERT_LIST,
    roles: [UserRole.AUTHORITY, UserRole.ADMIN],
    badgeKey: 'activeAlerts',
  },

  // Admin items
  {
    id: 'admin',
    label: 'Admin Overview',
    icon: '⊞',
    path: WEB_ROUTES.ADMIN,
    roles: [UserRole.ADMIN],
  },
  {
    id: 'admin-users',
    label: 'User Management',
    icon: '👥',
    path: WEB_ROUTES.ADMIN_USERS,
    roles: [UserRole.ADMIN],
  },
];
