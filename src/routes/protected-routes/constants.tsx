import { UserRole } from '../../enums/UserRole';

/** Maps each protected route path to the roles allowed to access it */
export const PROTECTED_ROUTE_ROLES: Record<string, UserRole[]> = {
  '/dashboard':   [UserRole.TOURIST],
  '/profile':     [UserRole.TOURIST],
  '/itinerary':   [UserRole.TOURIST],
  '/chatbot':     [UserRole.TOURIST],
  '/ops':         [UserRole.AUTHORITY, UserRole.ADMIN],
  '/ops/alerts':  [UserRole.AUTHORITY, UserRole.ADMIN],
  '/ops/tourists':[UserRole.AUTHORITY, UserRole.ADMIN],
  '/admin':       [UserRole.ADMIN],
  '/admin/users': [UserRole.ADMIN],
  '/admin/logs':  [UserRole.ADMIN],
};
