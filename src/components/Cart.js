import React, { Component } from 'react'

class Cart extends Component {
  render(){
    let myCartProducts = this.props.myCart.map((product, index) => {
      return (
        <li key={index}>{product.name} : {product.price}</li>
        // <ProductDetails key={index} inCart={true} />
      )
    })
    return(
      <div>
        <h2> My Cart Component</h2>
          <ul>
          {
            myCartProducts
          }
          <hr />
          <p className="float-right">Total: ${this.props.myCart[0] ? this.props.myCart.map((prod) => {return prod.price}).reduce((sum, value) => {return sum + value}) : 0}</p>
          <div>
            <button onClick={this.props.placeOrder}> Checkout </button>
          </div>
        </ul>
      </div>
    )
  }
}

export default Cart
// <div id="cart">
//   <h3>Cart</h3>
//   {
//     this.props.cart.map((product, index) => (
//     // <ProductDetails key={index} inCart={true} product={product} />
//     <li key={index._id}> {product.name} : ${product.price} </li>
//   ))}
//   <div></div>
//   <div><button onClick={this.props.placeOrder}> Checkout</button></div>
// </div>
