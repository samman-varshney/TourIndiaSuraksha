import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { UserRole } from '../../enums/UserRole';
import { WEB_ROUTES } from '../../routes/webroutes.constants';

/** Public registration page — dispatches registerRequest saga trigger on submit */
const RegisterPage: React.FC = () => {
  const { register, loading, error } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.TOURIST);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ name, email, password, role });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🛡</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Register to receive your Digital Tourist ID</p>

        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Full Name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role selector */}
          <div className="input-wrapper">
            <label className="input-label" htmlFor="role-select">Account Type</label>
            <select
              id="role-select"
              className="input-field"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <option value={UserRole.TOURIST}>Tourist</option>
              <option value={UserRole.AUTHORITY}>Authority / Police</option>
            </select>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            Create Account
          </Button>
        </form>

        <p className="auth-link">
          Already have an account? <a href={WEB_ROUTES.LOGIN}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
