import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import auth from './auth'
import logo from './logo.svg';

import NavBar from './components/NavBar'
import Home from './components/Home'
import Account from './components/Account'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import LogOut from './components/LogOut'
import Product from './components/Product'


class App extends Component {

  state = {
    cart : [],
    itemsOnCart : false,
    currentUser: auth.getCurrentUser()
  }

  setCurrentUser() {
    this.setState({
      currentUser: auth.getCurrentUser()
    })
  }

  logOut() {
    auth.clearToken()
    this.setState({currentUser: null})
  }
  handleAdd(p){
    this.setState({
      cart: [p],
      itemsOnCart: true
  })
    console.log(p);
  }

  render() {
    const currentUser = this.state.currentUser
    return (
      <Router>

        <div className="App">
          {currentUser
            ? <p>Hello, {currentUser.name}</p>
            : null
          }
          <NavBar currentUser={this.state.currentUser} />
          <Route exact path='/' component={Home} />

          <Route path='/product' render={() => (
            <Product addProduct={this.handleAdd.bind(this)}
              cart={this.state.cart}
            />


          )} />

          <Route path='/account' render={() => (
            currentUser
            ? <Account />
            : <Redirect to='/login' />
          )} />


          <Route path='/signup' component={SignUp} />
          <Route path='/login' render={() => (
            <LogIn onLogIn={this.setCurrentUser.bind(this)} />
          )} />
          <Route path='/logout' render={() => (
            <LogOut onLogOut={this.logOut.bind(this)} />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
