import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated, selectUserRole } from '../../features/auth/selectors';
import { WEB_ROUTES } from '../webroutes.constants';
import { ProtectedRouteProps } from './types';

/**
 * Route guard that redirects unauthenticated users to login.
 * Optionally restricts access to specific roles and shows a 403 page.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles,
  redirectTo = WEB_ROUTES.LOGIN,
}) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRole = useAppSelector(selectUserRole);
  const location = useLocation();

  // Redirect unauthenticated users, preserving the intended destination
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Block access if the user's role is not in the allowed list
  if (requiredRoles && userRole && !requiredRoles.includes(userRole)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
