import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/auth'

export default configureStore({
  reducer: {
    auth: authReducer
  },
  devTools: process.env.NODE_ENV !== "production",
})