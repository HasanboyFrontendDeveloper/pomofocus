import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Loader, Login, Register, ResetPass, SetPass } from './components'
import { useSelector } from 'react-redux'
import AuthService from './service/auth'
import { useDispatch } from 'react-redux'
import { getUserFailure, getUserStart, getUserSuccess } from './slices/auth'
import { getSettingsStart } from './slices/settings'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const { isLoading, isLoggedIn } = useSelector(state => state.auth)
  const { isLoadingSettings } = useSelector(state => state.settings)

  const dispatch = useDispatch()

  const getUser = async () => {
    dispatch(getUserStart())
    try {
      const data = await AuthService.getUser()
      dispatch(getUserSuccess(data))
    } catch (error) {
      dispatch(getUserFailure(error.message))
      console.error(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('Token')

    if (token) {
      getUser()
    }
  }, [])

  return (
    <>
      {(isLoading || isLoadingSettings) ? <Loader /> : null}
      <ToastContainer />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/set-password" element={<SetPass />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </>
  )
}

export default App