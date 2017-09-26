import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'


class Home  extends React.Component{
  constructor(props){
    super(props)
    this.state = {products: []}
    this.request = axios.create({baseURL: 'https://evening-springs-26292.herokuapp.com/api'})//this until here represents defaults
//'https://evening-springs-26292.herokuapp.com/api''http://localhost:3001/api'
  }

componentDidMount(){
  this.request({method: 'GET', url: '/products'})
  .then((prod)=>{
    console.log("?");

    console.log(prod.data);
    this.setState({products: prod.data})
    console.log(this.state);
  })
}

  render(){
    return (
      // <h1>The Pet Shop</h1>
      <div className="homepage">
        <p>We never met your dog, but we know we love them.</p>
        <img src={'http://www.dogtiredsc.com/wp-content/uploads/2015/05/dog-grooming-e1478283119973.jpg'} margin-left= "42px" />
        <hr className="bath-groom"/>
        <div className="bath-groom">
          <h3>Hello dog lovers, let's get started by choosing a customized blowout!</h3>
          <p>Every purchased blowout comes with a complimentary spa service</p>
        <br />
        <p>Each spa includes:</p>
      </div>
        <ul className="bath-groom2">
          ​<li>Organic Coconut Shampoo</li>
          <li>Blow Dry</li>
          <li>Brush Out</li>
          <li>Nails Trimmed</li>
          <li>Ears Cleaned</li>
          <li>Sanitary Trim (if requested)</li>
          <li>Ribbon or Bow</li>
        </ul>
      </div>

    )
  }
}

export default Home
