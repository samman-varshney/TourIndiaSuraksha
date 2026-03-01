import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { WEB_ROUTES } from './routes/webroutes.constants';
import AuthenticatedRouteHOC from './hoc/authenticatedRouteHOC';
import UnAuthenticatedRouteHOC from './hoc/unAuthenticatedRouteHOC';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layout/MainLayout';

// Root component — registers all top-level application routes
const App: React.FC = () => {
  return (
    <Routes>
      {/* Public / unauthenticated routes */}
      <Route element={<UnAuthenticatedRouteHOC />}>
        <Route path={WEB_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={WEB_ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      {/* Protected / authenticated routes */}
      <Route element={<AuthenticatedRouteHOC />}>
        <Route element={<MainLayout />}>
          <Route path={WEB_ROUTES.DASHBOARD} element={<div>Dashboard</div>} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
