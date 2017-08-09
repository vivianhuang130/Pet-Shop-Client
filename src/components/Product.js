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

// render(){
//   return(
//     <h1>
//       Products viVIAN
//       {this.state.products.map((p) => (
//         <li key={p.products}>
//           <img src={p.logoUrl} height="10%" width ="10%" />
//           {p.name}
//         </li>
//       ))
//     }
//
//     </h1>
//     )
//   }
// }
// export default Product

render(){
  return(

    <div className="container">
      <h1>Products viVIAN</h1>
        <div id="cart">
          {this.props.cart.length > 0 ?
             <ProductDetails inCart={true} product={this.props.cart[0]} /> : null}

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
  render(){
    return (
      <div>
        <div id="img">
        <img className='listPic' src={this.props.product.logoUrl} height="10%" width ="10%" />
      </div>
      <p>{this.props.product.name},  ${this.props.product.price}</p>
      {this.props.inCart ? null : <button onClick={this.handleClick.bind(this)}>Add</button>
}
      </div>
    )
  }
}
export default Product
