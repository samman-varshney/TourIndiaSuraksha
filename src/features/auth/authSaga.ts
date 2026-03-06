import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
} from "./authSlice";
import { LoginPayload, RegisterPayload } from "./types";
import { authApi } from "./api";

// Worker saga — handles the login API call and dispatches success/failure
function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const response: { user: any; token: string } = yield call(
      authApi.login,
      action.payload,
    );
    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(loginFailure(error?.message ?? "Login failed"));
  }
}

// Worker saga — handles the registration API call
function* handleRegister(action: PayloadAction<RegisterPayload>) {
  try {
    yield call(authApi.register, action.payload);
    // Optionally dispatch a success action or redirect here
  } catch (error: any) {
    yield put(loginFailure(error?.message ?? "Registration failed"));
  }
}

// Root auth watcher — listens for auth action types
export function* watchAuthSagas() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}
