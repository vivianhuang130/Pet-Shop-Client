
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import auth from './auth'
// import { Container, Row, Col } from 'reactstrap'

import NavBar from './components/NavBar'
import Home from './components/Home'
import Account from './components/Account'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import LogOut from './components/LogOut'
import ListProducts from './components/ListProducts'
import Images from './components/Images'

class App extends Component {
  state = {
    cart : [],
    myCart:[],
    itemsOnCart : false,
    currentUser: auth.getCurrentUser(),
    images: []
  }

  toggleItemsOnCart(){
    this.setState({

    })
  }

  addProductCart(product){
    console.log("-------- Product added to Cart ------- ");
    // get Item from localStorage cart
    let myStorageCart = localStorage.getItem("cart")
    // validate if first item
    if (myStorageCart != null) {
      // concatenate ';' to separate each product string from each other
      myStorageCart += ";"
      // Concatenate the next string product
      myStorageCart += JSON.stringify(product)
      // set localStorage 'cart' to the new string products
      localStorage.setItem("cart", myStorageCart)
      // get localStorage 'cart'
      let localCart = localStorage.getItem("cart")
      // split items from 'cart' by ';' (return an array of strings)
      // Go through the array and convert each element to an object
      // Return array of product objects
      let cartArray = localCart.split(";").map((ele) => { return JSON.parse(ele)})
      // Re-render <app /> component
      this.setState({
        cart: cartArray
      })
    }
    else {
      // set product to localStorage 'cart'
      let firstItem = localStorage.setItem("cart", JSON.stringify(product))
      // get string product from localStorage 'cart'
      let myStorageCart = localStorage.getItem("cart")

      let cartArray = []
      // convert the localStorage 'cart' to an Object.
      // push Object to array.
      cartArray.push(JSON.parse(myStorageCart))
      // re-renders the <App /> component with the new state
      this.setState({
        cart: cartArray
      })
    }
  }

  removeImageAt(event){
    event.preventDefault()
    console.log('removeImage: '+event.target.id);
    let updatedImages = Object.assign([], this.state.images)
    updatedImages.splice(event.target.id, 1)
    this.setState({
      images: updatedImages
    })
  }

  addImage(image){
    console.log('addImage: '+image.secure_url);
    let updatedImages = Object.assign([],this.state.images)
    updatedImages.push(image)
    // Callback when image's reference is save then re render on the page.
    auth.sendImage(image)
    this.setState({
      images: updatedImages
    })
  }

  getAllImages(){
    this.setState({
      images: auth.getAllImages
    })
  }

  setCurrentUser() {
    this.setState({
      currentUser: auth.getCurrentUser()
    })
  }

  placeOrder(){
    console.log("placing Order...");
    let localCart = localStorage.getItem('cart')

    const cart = localCart.split(";").map((ele) => { return JSON.parse(ele)})
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
    }, () => { localStorage.setItem("cart", JSON.stringify(this.state.cart)) })

    console.log(p);
  }

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

          <Route path='/products' render={() => (
            <ListProducts
              addProduct={this.handleAdd.bind(this)}
              cart={this.state.cart}
              placeOrder={this.placeOrder.bind(this)}
              addProductCart={this.addProductCart.bind(this)}
              placeOrder={this.placeOrder.bind(this)}
            />

            // new
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
          <Route path='/images' render={() => (
            <Images
              handleRemoveImage={this.removeImageAt.bind(this)}
              handleAddImage={this.addImage.bind(this)} />
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
