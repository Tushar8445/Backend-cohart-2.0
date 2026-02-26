import React, { useState } from 'react'
import '../styles/form.scss'
import '../../shared/button.scss'
import { Link } from 'react-router'
import {useAuth} from '../hooks/useAuth'


const Login = () => {

  const { handleLogin}  = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) =>{
    e.preventDefault();

    await handleLogin(username, password)

    console.log('user LoggedIn')
    
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username'id='username' placeholder='Username' />
          <input onInput={(e)=> {setPassword(e.target.value)}} type="password" name='password' id='password' placeholder='password' />
          <button>Login</button>

          <p>i don't have Account? <Link className='link' to='/register'>Register</Link></p>
        </form>

      </div>
    </main>
  )
}

export default Login
