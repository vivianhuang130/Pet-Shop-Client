import React from 'react'
import auth from '../auth'
import { Redirect } from 'react-router-dom'

class LogIn extends React.Component {
  state = {
    shouldRedirect: false
  }

  handleFormSubmit(evt) {
    evt.preventDefault()
    const formData = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    console.log("LOGGING IN...")
    console.log(formData)
    auth.logIn(formData).then(user => {
      if(user) {
        // this will set current user in parent state
        this.props.onLogIn()
        this.setState({shouldRedirect: true})
      }
    })
  }

  render() {
    return (
      this.state.shouldRedirect
      ? <Redirect to='/product' />
      : (
        <div className="login">
          <h1>Log In</h1>
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <input className="form" ref="email" type="text" placeholder="Email" />
            <input className="form" ref="password" type="password" placeholder="Password" />
            <button>Log In</button>
          </form>
        </div>
      )
    )
  }
}

export default LogIn
