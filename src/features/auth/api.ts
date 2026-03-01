import { apiClient } from '../../services/baseApiService';
import { API_ROUTES } from '../../services/api-routes';
import { LoginPayload, RegisterPayload } from './types';

// Encapsulates all HTTP calls related to authentication
export const authApi = {
  // POST credentials and receive user + JWT token
  login: (payload: LoginPayload) =>
    apiClient.post(API_ROUTES.AUTH.LOGIN, payload).then((r) => r.data),

  // POST new user registration details
  register: (payload: RegisterPayload) =>
    apiClient.post(API_ROUTES.AUTH.REGISTER, payload).then((r) => r.data),

  // POST to invalidate the server-side session/token
  logout: () =>
    apiClient.post(API_ROUTES.AUTH.LOGOUT).then((r) => r.data),

  // GET the authenticated user's profile from the current token
  getMe: () =>
    apiClient.get(API_ROUTES.AUTH.ME).then((r) => r.data),
};
