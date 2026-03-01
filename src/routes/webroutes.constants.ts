// Central registry of every client-side navigation path
export const WEB_ROUTES = {
  // Public routes
  HOME:     '/',
  LOGIN:    '/login',
  REGISTER: '/register',
  FORGOT:   '/forgot-password',

  // Tourist routes
  DASHBOARD:       '/dashboard',
  TOURIST_PROFILE: '/profile',
  ITINERARY:       '/itinerary',
  CHATBOT:         '/chatbot',

  // Authority routes
  OPS_CENTER:  '/ops',
  ALERT_LIST:  '/ops/alerts',
  ALERT_DETAIL:(id: string) => `/ops/alerts/${id}`,
  TOURIST_LIST:'/ops/tourists',

  // Admin routes
  ADMIN:       '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_LOGS:  '/admin/logs',

  // Fallback
  NOT_FOUND: '*',
} as const;
