import React, { Component } from 'react'
import Product from './Product'
import auth from '../auth'

class ListProducts extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: [{}]
    }
  }
  // gets all products when component mount and after renders component
  componentDidMount() {
    auth.getProducts().then((response) => {
      let allProducts = response.data
      console.log("------ Brings all products -------");
      console.log(allProducts);
      console.log("------ Brings all products -------");
      this.setState({
        products: allProducts
      })
    })
  }

  render(){
    var myProducts = this.state.products.map((product,i) => {
      return (
        <div key={i} className="col-xs-6">
          <Product
            name={product.name}
            description={product.description}
            price={product.price}
            handleAddCart={() => this.props.addProductCart(product)}
          />
        </div>
      )
    })
    return (
      <div>
        <h2 className="available-hairstyles">Available Hairstyles</h2>
        <div  className="row">
          {
            myProducts
          }
        </div>
      </div>
    )
  }
}

export default ListProducts
