import { UserRole } from '../../enums/UserRole';

/** Shape of the authenticated user object stored in state */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

/** Redux state shape for the auth feature slice */
export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

/** Payload dispatched to trigger login saga */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Payload dispatched to trigger registration saga */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
