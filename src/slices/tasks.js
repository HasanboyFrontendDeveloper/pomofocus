import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      title: "Task start",
      note: "",
      id: "qwertertyhj",
      isFinished: false,
      isActive: true,
    },
    {
      title: "Dars qilish",
      note: "Uy ishi",
      id: "yuio",
      isFinished: false,
      isActive: false,
    },
    {
      title: "Ovqatlanish",
      note: "",
      id: "asdfg",
      isFinished: true,
      isActive: false,
    },
  ],
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    }
  },
});

export const { updateTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
