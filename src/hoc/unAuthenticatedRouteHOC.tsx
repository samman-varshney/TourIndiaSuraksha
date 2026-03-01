import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../features/auth/selectors';
import { WEB_ROUTES } from '../routes/webroutes.constants';

/**
 * HOC wrapper for public-only routes (login, register).
 * Redirects authenticated users away from auth pages to the dashboard.
 */
const UnAuthenticatedRouteHOC: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={WEB_ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default UnAuthenticatedRouteHOC;
