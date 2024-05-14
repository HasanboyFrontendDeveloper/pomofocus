import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login } from './components'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App