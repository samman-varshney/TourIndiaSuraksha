import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectUserRole,
} from '../features/auth/selectors';
import { loginRequest, logout, registerRequest } from '../features/auth/authSlice';
import type { LoginPayload, RegisterPayload } from '../features/auth/types';

/** Exposes auth state and dispatch helpers to any component */
export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const role = useAppSelector(selectUserRole);

  // Dispatch login saga trigger
  const login = useCallback(
    (payload: LoginPayload) => dispatch(loginRequest(payload)),
    [dispatch]
  );

  // Dispatch register saga trigger
  const register = useCallback(
    (payload: RegisterPayload) => dispatch(registerRequest(payload)),
    [dispatch]
  );

  // Dispatch logout and clear session
  const signOut = useCallback(() => dispatch(logout()), [dispatch]);

  return { user, isAuthenticated, loading, error, role, login, register, signOut };
};
