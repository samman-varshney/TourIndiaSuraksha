import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { statusEnum } from "../types/baseEntityStore";

interface AuthState {
  userId: string | null;
  status: statusEnum;
  message?: string | null;
}

const initialState: AuthState = {
  userId: null,
  status: statusEnum.idle,
  message: null,
};

type AuthSliceState = typeof initialState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<statusEnum>) {
      state.status = action.payload;
    },

    setAuthMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },

    setAuthUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },

    resetAuthState() {
      return initialState;
    },
  },
  selectors: {
    selectAuth: (state: AuthSliceState) => state,
    selectUser: (state: AuthSliceState) => state.userId,
    selectStatus: (state: AuthSliceState) => state.status,
    selectMessage: (state: AuthSliceState) => state.message,
  },
});

export const { setAuthMessage, setAuthStatus, setAuthUserId } =
  authSlice.actions;

export const authSelectors = authSlice.selectors;
export default authSlice.reducer;
