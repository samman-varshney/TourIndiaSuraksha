import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { WEB_ROUTES } from '../routes/webroutes.constants';

/** Fallback 404 page shown for any unregistered route */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-page-code">404</div>
      <h1 className="error-page-title">Page Not Found</h1>
      <p className="error-page-desc">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button variant="primary" onClick={() => navigate(WEB_ROUTES.DASHBOARD)}>
        Return to Dashboard
      </Button>
    </div>
  );
};

export default NotFoundPage;
