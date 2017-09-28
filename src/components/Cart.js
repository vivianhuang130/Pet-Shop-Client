import React, { Component } from 'react'

class Cart extends Component {
  render(){
    return(
      <div>
        <h2> My Cart Component</h2>

      </div>
    )
  }
}

// <div id="cart">
//   <h3>Cart</h3>
//   {
//     this.props.cart.map((product, index) => (
//     // <ProductDetails key={index} inCart={true} product={product} />
//     <li key={index._id}> {product.name} : ${product.price} </li>
//   ))}
//   <div>Total: ${this.props.cart[0] ? this.props.cart.map((item)=> {return item.price}).reduce(function(sum, value){return sum + value}) : 0}</div>
//   <div><button onClick={this.props.placeOrder}> Checkout</button></div>
// </div>
