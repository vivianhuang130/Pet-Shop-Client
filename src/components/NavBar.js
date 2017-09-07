import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = (props) => {
return(
  <div>
  <div id="website-name">
    The Pet Shop
  </div>
  <div id="half-pic">
    <img src={'http://sityourpets.com/wp-content/uploads/job-manager-uploads/candidate_photo/2015/05/Funny-Animals-4-1.jpg'}/>
  </div>
  <div>
  <hr />
  </div>
  <div className="NavBar">
    <p className="Home spacing"><NavLink exact to='/'>Home</NavLink></p>
    <p className="Product spacing"><NavLink to='/product'>Product</NavLink></p>
    <p className="Account spacing"><NavLink to='/account'>My Account</NavLink></p>
    {props.currentUser
      ? (
        <p className="LogOut spacing"><NavLink to='/logout'>Log Out</NavLink></p>
      )
      : (
        <p>
          <p className="LogIn spacing"><NavLink to='/login'>Log In</NavLink></p>
          <p className="SignUp spacing"><NavLink to='/signup'>Sign Up</NavLink></p>
        </p>
      )
    }
  </div>
  <div>
  <hr id="hr1" />
  </div>
</div>
  )
}

export default NavBar
