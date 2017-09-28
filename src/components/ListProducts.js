import React, { Component } from 'react'
import Product from './Product'
import auth from '../auth'

class ListProducts extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: []
    }
  }
  // gets all products when component mount and after renders component
  componentDidMount() {
    auth.getProducts().then((product) => {
      console.log("------ Brings all products -------");
      console.log(product.data);
      console.log("------ Brings all products -------");
      this.setState({products: this.state.products.push(product.data)})
    })
  }

  render(){
    let myProducts = () => this.state.products.map((product) => {
      return (
        <Product
          name={product.name}
          description={product.description}
          price={product.price}
          handleAddCart={() => this.props.addProductCart(product)}
        />
      )
    })
    return (
      <div>
        {
          myProducts
        }
      </div>
    )
  }
}

export default ListProducts
