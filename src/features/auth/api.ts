import { baseApiService } from "../../services/baseApiService";
import { API_ROUTES } from "../../services/api-routes";
import { LoginPayload, RegisterPayload } from "./types";

// Encapsulates all HTTP calls related to authentication
export const authApi = {
  // POST credentials and receive user + JWT token
  login: (payload: LoginPayload) =>
    baseApiService
      .post(API_ROUTES.AUTH.LOGIN, payload)
      .then((r: any) => r.data),

  // POST new user registration details
  register: (payload: RegisterPayload) =>
    baseApiService
      .post(API_ROUTES.AUTH.REGISTER, payload)
      .then((r: any) => r.data),

  // POST to invalidate the server-side session/token
  logout: () =>
    baseApiService.post(API_ROUTES.AUTH.LOGOUT).then((r: any) => r.data),

  // GET the authenticated user's profile from the current token
  getMe: () => baseApiService.get(API_ROUTES.AUTH.ME).then((r: any) => r.data),
};
