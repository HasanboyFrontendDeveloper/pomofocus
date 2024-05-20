import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Register, ResetPass, SetPass } from './components'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/set-password" element={<SetPass />} />
      </Routes>
    </>
  )
}

export default App