import React from 'react'
import {Link} from 'react-router'

const Register = () => {

  const handleRegister = (e) =>{
    e.preventDefault()
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input type="text" name='username'id='username' placeholder='Username' />
          <input type="email" name='email' id='email' placeholder='Email' />
          <input type="password" name='password'id='password'placeholder='Password' />
          <button>Register</button>
          <p>i have account <Link className='link' to='/login' >Login</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Register
