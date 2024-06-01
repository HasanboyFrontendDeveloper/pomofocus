import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { updateTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
