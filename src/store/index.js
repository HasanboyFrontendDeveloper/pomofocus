import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/auth'
import settingsReducer from '../slices/settings'
import tasksReducer from '../slices/tasks'

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    settings: settingsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})