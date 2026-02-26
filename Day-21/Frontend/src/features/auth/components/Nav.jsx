import React from 'react'
import { Link } from 'react-router'

const Nav = () => {
  return (
    <>
        <Link to={<Login/>}> Login</Link>
        <Link to={<Register/>}> Register</Link>
    </>
  )
}

export default Nav
