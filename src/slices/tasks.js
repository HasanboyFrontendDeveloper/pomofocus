import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      title: "Task start",
      note: "",
      id: "qwertertyhj",
      isFinished: false,
    },
    {
      title: "Dars qilish",
      note: "Uy ishi",
      id: "yuio",
      isFinished: true,
    },
    {
      title: "Ovqatlanish",
      note: "",
      id: "asdfg",
      isFinished: false,
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
    },
    addTask: (state, action) => {},
  },
});

export const { updateTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
