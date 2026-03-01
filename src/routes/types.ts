import { UserRole } from '../enums/UserRole';

/** Shape of a single route definition used in the routing configuration */
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  requiredRoles?: UserRole[];   // Leave empty for public routes
  children?: RouteConfig[];
}
