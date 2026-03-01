import { UserRole } from '../../enums/UserRole';

/** Props accepted by the ProtectedRoute wrapper component */
export interface ProtectedRouteProps {
  requiredRoles?: UserRole[];   // When omitted, any authenticated user may access
  redirectTo?: string;          // Path to redirect unauthenticated users (default: /login)
}
