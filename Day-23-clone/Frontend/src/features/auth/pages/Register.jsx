import React from 'react'
import '../style/form.scss'
import '../style/button.scss'
import {Link} from 'react-router'


const Register = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form >
          <input  type="text" name='username'id='username' placeholder='Username' />
          <input type="email" name='email' id='email' placeholder='Email' />
          <input  type="password" name='password' id='password' placeholder='password' />
          <button>Register Now</button>
          <p>i have an Account? <Link className='link' to='/login'>Login</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Register
