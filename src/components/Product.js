import React from 'react'
import auth from '../auth'
import { Container, Row, Col } from 'reactstrap';

class Product extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      products: [],
      productList: {"Dog Blowout":0}
    }
  }

  componentDidMount() {
    auth.getProducts().then((prod)=> {
      console.log("?");

      console.log(prod.data);
      this.setState({products: prod.data})
      console.log(this.state);
    })
  }

render(){
  return(
    <div className="container">
      <h2 className="available-hairstyles">Available Hairstyles</h2>

        <div id="cart">
          <h3>Cart</h3>
          {this.props.cart.map((product, index) => (
            // <ProductDetails key={index} inCart={true} product={product} />
            <li key={index._id}> {product.name} : ${product.price} </li>
          ))}
          <div>Total: ${this.props.cart[0] ? this.props.cart.map((item)=> {return item.price}).reduce(function(sum, value){return sum + value}) : 0}</div>
          <div><button onClick={this.props.placeOrder}> Checkout</button></div>
        </div>
        <div className="pds">
          {this.state.products.map((p) => (
            // <li id='products' key={p._id}>
                <ProductDetails addProduct={this.props.addProduct} product={p} />
            // </li>
            ))}
          </div>
        </div>

    )
  }
}

class ProductDetails extends React.Component {
  constructor(props){
    super(props)
  }
  handleClick(){
    this.props.addProduct(this.props.product)
  }
// new
  // handleClickClear(){
  //   this.props.clearProduct(this.props.product)
  // }
  render(){
    return (
      <div className="col-md-3">
        {/* <div className="layout"> */}
          <div>
            <img className='listPic' src={this.props.product.logoUrl} />
            <div id="name-price">
              <div id="product-name">{this.props.product.name} </div>
              <br/>
              <div id="product-price">${this.props.product.price} </div>
              <br/>
              {this.props.inCart ? null : <button id="button" onClick={this.handleClick.bind(this)}>Add</button>}
            </div>
          </div>
        {/* </div> */}
      </div>
    )}
  }

export default Product
