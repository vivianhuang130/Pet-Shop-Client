import React, { Component } from 'react'
// import auth from '../auth'
// import { Container, Row, Col } from 'reactstrap';

class Product extends Component {

  render(){
    return(
      <div className="container">
        <div className="product-image">
          <img src={this.props.image} alt="Amazing product" height="200" width="200"/>
        </div>
        <div className="details">
          <h4>Description: {this.props.description}</h4>
          <h4>Price: {this.props.price}</h4>
          <button onClick={this.props.handleAddCart}>Add to Cart</button>
        </div>
      </div>
    )
  }
}

// class ProductDetails extends React.Component {
//   render(){
//     return (
//       <div className="col-md-3">
//         {/* <div className="layout"> */}
//           <div>
//             <img className='listPic' src={this.props.product.logoUrl} />
//             <div id="name-price">
//               <div id="product-name">{this.props.product.name} </div>
//               <br/>
//               <div id="product-price">${this.props.product.price} </div>
//               <br/>
//               {this.props.inCart ? null : <button id="button" onClick={this.handleClick.bind(this)}>Add</button>}
//             </div>
//           </div>
//         {/* </div> */}
//       </div>
//     )
//   }
// }

export default Product
