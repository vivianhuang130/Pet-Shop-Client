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
    auth.getProducts().then((prod)=>{
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
    <div className="container text-center">
      <h1>Products viVIAN</h1>
      <div className="row">
        <div className="col-sm-3">
          {this.state.products.map((p) => (
            <li id='products' key={p._id}>
              <img className='listPic' src={p.logoUrl} height="10%" width ="10%" />
                  <p>{p.name},  ${p.price}</p>



            </li>
          ))}
        </div>
        </div>
        </div>
    )
  }
}
export default Product
