import { LoginRequestDto } from "@/dto/auth";
import { PayloadAction } from "@reduxjs/toolkit";
import { setAuthMessage, setAuthStatus } from "../slices/authSlice";
import { statusEnum } from "../types/baseEntityStore";
import { call, put, takeLatest } from "redux-saga/effects";
import { authservice } from "../../services/auth/AuthService";

function* handleLogin(action: PayloadAction<LoginRequestDto>) {
  try {
    yield put(setAuthStatus(statusEnum.loading));
    yield call(authservice.login, action.payload);
    yield put(setAuthStatus(statusEnum.success));
  } catch (e: any) {
    yield put(setAuthStatus(statusEnum.error));
    yield put(setAuthMessage(e.message || "login Failed"));
  }
}

export function* authSaga() {
  yield takeLatest("LOGIN_REQUEST", handleLogin);
}
