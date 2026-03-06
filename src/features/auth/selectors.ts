import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Base selector — returns the entire auth slice state
const selectAuthState = (state: RootState) => state.auth;

// Returns the authenticated user object or null
export const selectCurrentUser = createSelector(
  selectAuthState,
  (auth) => auth.user,
);

// Returns true if the user has a valid session
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (auth) => auth.isAuthenticated,
);

// Returns the current JWT token
export const selectAuthToken = createSelector(
  selectAuthState,
  (auth) => auth.token,
);

// Returns auth loading state
export const selectAuthLoading = createSelector(
  selectAuthState,
  (auth) => auth.loading,
);

// Returns the current auth error message
export const selectAuthError = createSelector(
  selectAuthState,
  (auth) => auth.error,
);

// Returns the role of the currently logged-in user
export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user?.role ?? null,
);
