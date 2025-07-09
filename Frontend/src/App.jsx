import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainUploadPage from './pages/MainUploadPage'
import ProtectedRoute from './private/protectedRoute'

const App = () => {


  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/dashboard' element={
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    } />
    <Route path='/chat-pdf' element={
      <ProtectedRoute>
        <MainUploadPage/>
      </ProtectedRoute>
    } />
   </Routes>
   </>
  )
}

export default App
