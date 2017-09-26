
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import auth from './auth'
import { Container, Row, Col } from 'reactstrap'

import NavBar from './components/NavBar'
import Home from './components/Home'
import Account from './components/Account'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import LogOut from './components/LogOut'
import Product from './components/Product'
import Images from './components/Images'

class App extends Component {
  state = {
    cart : JSON.parse(localStorage.getItem("cart"))||[],
    itemsOnCart : false,
    currentUser: auth.getCurrentUser()
  }

  setCurrentUser() {
    this.setState({
      currentUser: auth.getCurrentUser()
    })
  }

  placeOrder(){
    console.log("placing Order...");
    const cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)
    auth.sendOrder({cart: cart}).then(response => {
      localStorage.removeItem('cart')
      this.setState({cart:[]})
    })
  }

  logOut() {
    auth.clearToken()
    this.setState({currentUser: null})
  }
  handleAdd(p){
    // before setting the state
    // send a patch request to '/users/:id/cart/:productId'
    // in the .then() for the request, you can update the state like below:
    this.setState({
      cart: [
        ...this.state.cart,
        p
      ],
      itemsOnCart: true
  }, ()=>{localStorage.setItem("cart", JSON.stringify(this.state.cart))})

    console.log(p);
  }

    ///new
  // handleClear(p){
  //   this.setState({
  //     cart: [
  //       ...this.state.cart,
  //       p
  //     ],
  //     itemsOnCart: true
  // }, ()=>{localStorage.removeItem("cart", JSON.stringify(this.state.cart))})
  //
  //   console.log(p);
  // }

  render() {
    const currentUser = this.state.currentUser
    return (
      <Router>

        <div id="name">
          {currentUser
            ? <p>Hello, {currentUser.name}</p>
            : null
          }
          <NavBar currentUser={this.state.currentUser} />
          <Route exact path='/' component={Home} />

          <Route path='/product' render={() => (
            <Product addProduct={this.handleAdd.bind(this)}
              cart={this.state.cart} placeOrder={this.placeOrder.bind(this)}
            />

  ///new
            // <Product clearProduct={this.handleClearClick.bind(this)}
            //   cart={this.state.cart}
            // />

          )} />

          <Route path='/account' render={() => (
            !!this.state.currentUser
            ? <Account currentUser={this.state.currentUser} parent={this}/>
            : <Redirect to='/login' />
          )} />


          <Route path='/signup' component={SignUp} />
          <Route path='/login' render={() => (
            <LogIn onLogIn={this.setCurrentUser.bind(this)} />
          )} />
          <Route path='/logout' render={() => (
            <LogOut onLogOut={this.logOut.bind(this)} />
          )} />
          <Route path='/images' component={Images} />
        </div>
      </Router>
    );
  }
}

export default App;
