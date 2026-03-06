import React from 'react'
import router from './app.routes'
import { RouterProvider } from 'react-router-dom'
import './features/shared/global.scss'
import { AuthProvider } from './features/auth/auth.context'


const App = () => {

  return (
    <main>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </main>
  )
}

export default App
