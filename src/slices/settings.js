import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingSettings: false,
  timers: [
    {
      title: "Pomodoro",
      minute: 25,
      second: 0,
    },
    {
      title: "Short Break",
      minute: 5,
      second: 0,
    },
    {
      title: "Long Break",
      minute: 15,
      second: 0,
    },
  ],
  timerId: 0,
  notifyTimer: 1,
  notifyId: 0,
  currentColor: "red",
  colorId: 0,
  error: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    getSettingsStart: (state) => {
      state.isLoading = true;
    },
    getSettingsFinish: (state) => {
      state.isLoading = false;
    },
    updateTimer: (state, action) => {
      state.isLoading = false;
      state.timers = action.payload;
    },
    updateTimerId: (state, action) => {
      state.timerId = action.payload;
    },
    updateNotifyTimer: (state, action) => {
      state.notifyTimer = action.payload;
    },
    changeColor: (state, action) => {
      state.isLoading = false;
      state.currentColor = action.payload;
    },
    changeColorId: (state, action) => {
      state.colorId = action.payload;
    },
    changeNotify: (state, action) => {
      state.isLoading = false;
      state.notifyTimer = action.payload;
    },
    changeNotifyId: (state, action) => {
      state.notifyId = action.payload;
    },
  },
});

export const {
  updateTimer,
  updateTimerId,
  changeColor,
  changeColorId,
  updateNotifyTimer,
  getSettingsStart,
  getSettingsFinish,
  changeNotify,
  changeNotifyId,
} = settingsSlice.actions;

export default settingsSlice.reducer;
