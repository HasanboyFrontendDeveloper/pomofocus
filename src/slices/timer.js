import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timers: [
    {
      title: "Pomodoro",
      minute: 0,
      second: 5,
    },
    {
      title: "Short Break",
      minute: 1,
      second: 30,
    },
    {
      title: "Long Break",
      minute: 2,
      second: 0,
    },
  ],
  error: null,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateTimer: (state, action) => {
      state.timers = action.payload;
    },
  },
});

export const { updateTimer } = timerSlice.actions;

export default timerSlice.reducer;
