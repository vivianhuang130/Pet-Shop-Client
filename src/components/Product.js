import React from 'react'
import auth from '../auth'

class Product extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      products: []
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
      <h1>Available Hairstyles </h1>
        <div id="cart">
          {this.props.cart.map((product, index) => (
            // <ProductDetails key={index} inCart={true} product={product} />
            <li>{product.name} : ${product.price} </li>
          ))}
          <div>Total: ${this.props.cart[0] ? this.props.cart.map((item)=> {return item.price}).reduce(function(sum, value){return sum + value}) : 0}</div>
{/*new  */}
      <div><button onClick={this.props.placeOrder}> Checkout</button></div>
        </div>
          {this.state.products.map((p) => (
            <li id='products' key={p._id}>
                <ProductDetails addProduct={this.props.addProduct} product={p} />
            </li>

            ))
          }
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
      <div>
        <div id="img">
        <img className='listPic' src={this.props.product.logoUrl} height="10%" width ="10%" />
      </div>
      <p>{this.props.product.name} </p> <br/>
      <p>${this.props.product.price} </p>
      {this.props.inCart ? null : <button onClick={this.handleClick.bind(this)}>Add</button>
}

{/* new */}
      {/* <div><button onClick={this.handleClearClick.bind(this)}>Checkout </button></div> */}
</div>
    )
  }
}
export default Product
