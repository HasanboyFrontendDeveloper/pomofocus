import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: [],
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserStart: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    getUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserStart, getUserSuccess, getUserFailure } =
  authSlice.actions;

export default authSlice.reducer;
