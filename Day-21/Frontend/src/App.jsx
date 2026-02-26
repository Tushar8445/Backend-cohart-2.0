import React from 'react'
import { RouterProvider } from 'react-router'
import router from './app.routes'
import './features/shared/global.scss'
import Nav from './features/auth/components/Nav'
import { AuthProvider } from './features/auth/context/AuthContext'

const App = () => {
  return (
    <>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    </>
  )
}

export default App
