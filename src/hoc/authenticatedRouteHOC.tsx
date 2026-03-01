import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../features/auth/selectors';
import { WEB_ROUTES } from '../routes/webroutes.constants';

/**
 * HOC wrapper for authenticated route groups.
 * Redirects to /login if no active session is found.
 */
const AuthenticatedRouteHOC: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Preserve intended path so login page can redirect back after sign-in
    return (
      <Navigate to={WEB_ROUTES.LOGIN} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};

export default AuthenticatedRouteHOC;
