import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/auth'
import timerReducer from '../slices/timer'
import tasksReducer from '../slices/tasks'

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    timer: timerReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})