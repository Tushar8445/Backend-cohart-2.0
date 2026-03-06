import React, { useState } from 'react'
import '../style/form.scss'
import '../style/button.scss'
import { Link } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { Navigate } from 'react-router'

const Login = () => {

  const { handleLogin} = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) =>{

    e.preventDefault()

    const response = await handleLogin(username, password)

    console.log('User LoggedIn',response)
    
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input onInput={(e)=>setUsername(e.target.value)} type="text" name='username'id='username' placeholder='Username' />
          <input onInput={(e)=>setPassword(e.target.value)} type="password" name='password' id='password' placeholder='password' />
          <button>Login</button>
          <p>i don't have Account? <Link className='link' to='/register'>Register</Link></p>          
        </form>
      </div>
    </main>
  )
}

export default Login
