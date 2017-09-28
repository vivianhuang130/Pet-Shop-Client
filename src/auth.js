import axios from 'axios'
import jwtDecode from 'jwt-decode'

class AuthClient {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001/api',
      // baseURL:'https://evening-springs-26292.herokuapp.com/api',
      headers: {
      // post:{
      //   token: //only for post token
      // }
        common: {
          token: this.getToken()
        }
      }
    })//this until here represents defaults
  }

  editUser(accountEdit,id) {
    console.log(id);
    return this.request({method: 'PATCH', url: `/users/${id}`, data: accountEdit})
    .then(response => {
      if(response.data.success) { //if successfully logged in
        const token = response.data.token //if success is true we can assume token is in there
        this.setToken(token)
        return jwtDecode(token) //token for name,id,email of the user
      } else {
        return false
      }
    })
  }
  signUp(userInfo) {
    return this.request({method: 'POST', url: '/users', data: userInfo})
      .then((response) => response.data.success)
  }
  deleteUser(id){
    return this.request({method: 'DELETE', url: `/users/${id}`})
    .then((response) => {
      if(response.data.success) {
        this.clearToken()
      }
    })
  }
  logIn(credentials){ //email and password -info need to log in
    return this.request({method: 'POST', url: '/authenticate', data: credentials})
      .then(response => {
        if(response.data.success) { //if successfully logged in
          const token = response.data.token //if success is true we can assume token is in there
          this.setToken(token)
          return jwtDecode(token) //token for name,id,email of the user
        } else {
          return false
        }
      })
  }
  getCurrentUser(){
    const token = this.getToken()
    return token ? jwtDecode(token) : null
  }
  getToken() {
    // retrieve token from local storage:
    return localStorage.getItem('token')
  }
  setToken(token) {
    // save token to localStorage:
    localStorage.setItem('token', token)
    // tell axios to always include this token in headers:
    this.request.defaults.headers.common.token = token  //setting a property of an object
    return token
  }
  clearToken() {
    // remove token from localStorage:
    localStorage.removeItem('token')

    // tell axios to stop sending with token:
    delete this.request.defaults.headers.common.token //delete key val pair from an object
  }

  getProducts() {
    return this.request({method: 'GET', url: '/products'})
      .then(response => {
        console.log(response)
        return response.data
      })
    }
  getOrders() {
      return this.request({method: 'GET', url: '/orders'})
        // .then(response => {
        //   // if(response) {
        //   console.log(response)
        //     response.data
        //   // }
        // })
      }
  sendOrder(cart) {
    return this.request({method: 'POST', url: '/orders', data: cart})
      .then(response => console.log(response))
  }
  // Sends image url to store as strings on the database
  sendImage(image, id) {
    return this.request({method: 'POST', url:`/products/${id}/image`, data:image.secure_url})
      .then(response => console.log(response))
  }
  // Get all save urls
  getAllImages() {
    return this.request({ method: 'GET', url:'/products/images' })
      .then(response => console.log(response))
  }
  // function that sends request to retrieve orders from '/orders'
  // getUserOrders()

}

export default new AuthClient()
