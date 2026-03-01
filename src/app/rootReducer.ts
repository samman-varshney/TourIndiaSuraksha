import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/authSlice';

// Combine all feature slice reducers into a single root reducer
export const rootReducer = combineReducers({
  auth: authReducer,
  // Add more feature reducers here as the project grows
});
