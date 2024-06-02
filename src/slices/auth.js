import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: [],
  userId: null,
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
      state.isLoggedIn = true;
      state.user = action.payload;
      state.userId = action.payload.id;
    },
    getUserFailure: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    editProfile: (state, action) => {
      state.user.name = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.user = [];
      localStorage.removeItem("Token");
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  editProfile,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
