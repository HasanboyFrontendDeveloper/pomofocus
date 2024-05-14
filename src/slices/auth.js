import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: [],
  error: null,
  value: 0,
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
    increaseVal: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserStart, getUserSuccess, getUserFailure, increaseVal } =
  authSlice.actions;

export default authSlice.reducer;
