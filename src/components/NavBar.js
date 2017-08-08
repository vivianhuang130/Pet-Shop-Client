import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = (props) => {
return(
  <ul className="NavBar">
    <li className="Product"><NavLink to='/product'>Product</NavLink></li>
    <li className="Home"><NavLink exact to='/'>Home</NavLink></li>
    <li className="Private"><NavLink to='/private'>Private</NavLink></li>
    {props.currentUser
      ? (
        <p>
          <li className="LogOut"><NavLink to='/logout'>Log Out</NavLink></li>
        </p>
      )
      : (
        <p>
          <li className="LogIn"><NavLink to='/login'>Log In</NavLink></li>
          <li className="SignUp"><NavLink to='/signup'>Sign Up</NavLink></li>
        </p>
      )
    }
  </ul>
  )
}

export default NavBar
