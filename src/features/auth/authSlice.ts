import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthUser, LoginPayload, RegisterPayload } from './types';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Trigger the login saga — sets loading
    loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = true;
      state.error = null;
    },
    // Store user + token after successful authentication
    loginSuccess: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    // Store error message on login failure
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Trigger registration saga
    registerRequest: (state, _action: PayloadAction<RegisterPayload>) => {
      state.loading = true;
      state.error = null;
    },
    // Clear auth state on logout
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  logout,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
