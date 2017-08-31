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
      <h1 className="name">The Pet Shop</h1>
      <h2>Available Hairstyles </h2>

        <div id="cart">
          {this.props.cart.map((product, index) => (
            // <ProductDetails key={index} inCart={true} product={product} />
            <li>{product.name} : ${product.price} </li>
          ))}
          <div>Total: ${this.props.cart[0] ? this.props.cart.map((item)=> {return item.price}).reduce(function(sum, value){return sum + value}) : 0}</div>
          <div><button onClick={this.props.placeOrder}> Checkout</button></div>
        </div>

          {this.state.products.map((p) => (
            <li id='products' key={p._id}>
                <ProductDetails addProduct={this.props.addProduct} product={p} />
            </li>
            ))}

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
      <Container id="container">
        <Row id="row">
          <Col sm={{ size: 'auto', offset: 1 }}>
            <div>
              <img className='listPic' src={this.props.product.logoUrl} height="40%" width ="40%" />
              <div id="name-price">
                <p>{this.props.product.name} </p>
                <p>${this.props.product.price} </p>
                {this.props.inCart ? null : <button onClick={this.handleClick.bind(this)}>Add</button>}
              </div>
            </div>
          </Col>
        </Row>
    </Container>
    )}
  }

export default Product
