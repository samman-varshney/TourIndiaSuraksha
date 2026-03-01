import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { WEB_ROUTES } from '../../routes/webroutes.constants';

/** Public login page — dispatches loginRequest saga trigger on submit */
const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect to the originally intended page or the dashboard after login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname
    ?? WEB_ROUTES.DASHBOARD;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🛡</div>
        <h1 className="auth-title">Sign In</h1>
        <p className="auth-subtitle">SafeTrail — Smart Tourist Safety System</p>

        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            Sign In Securely
          </Button>
        </form>

        <p className="auth-link">
          Don't have an account?{' '}
          <a href={WEB_ROUTES.REGISTER}>Register free</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
