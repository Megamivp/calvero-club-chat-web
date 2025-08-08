import { api } from "@/services/api";
import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface SessionState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: SessionState = {
  user: null,
  isLoggedIn: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload.data;
        state.isLoggedIn = true;
      },
    );
    builder.addMatcher(api.endpoints.getUser.matchRejected, (state) => {
      state.user = null;
      state.isLoggedIn = false;
    });
  },
});

export const { resetUser } = sessionSlice.actions;

export default sessionSlice.reducer;
