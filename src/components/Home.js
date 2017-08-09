import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

class Home  extends React.Component{
  constructor(props){
    super(props)
    this.state = {products: []}
    this.request = axios.create({baseURL: 'http://localhost:3001/api'})//this until here represents defaults
//'https://evening-springs-26292.herokuapp.com/api'
  }

componentDidMount(){
  this.request({method: 'GET', url: '/products'})
  .then((prod)=>{
    console.log("?");

    console.log(prod.data);
    this.setState({products: prod.data})
    console.log(this.state);
  })
}

  render(){
    return (

      <div className="container text-center">
        <h1>Products viVIAN</h1>
        <div className="row">
          <div className="col-sm-3">
            {this.state.products.map((p) => (
              <li id='products' key={p._id}>



                <img src={p.logoUrl} height="10%" width ="10%" />

                {/* <button onclick="activateLasers()"></button> */}

                <p>{p.name}</p>
                <p>${p.price}</p>
                {/* <p>{p.description}</p> */}


              </li>
            ))}
          </div>
          </div>
          </div>

    )
  }
}

export default Home

// import React from 'react'
// import {NavLink} from 'react-router-dom'
// import auth from '../auth'
//
// class Home extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       products: []
//     }
//   }
//   componentDidMount() {
//     auth.getProducts().then((prod)=>{
//       console.log("?");
//
//       console.log(prod.data);
//       this.setState({products: prod.data})
//       console.log(this.state);
//     })
//   }
//
// render(){
//   return(
//     <h1>
//       Home viVIAN
//       {this.state.products.map((p) => (
//         <li>
//           <img key="child" src={p.logoUrl} height="10%" width ="10%" />
//           {p.name}
//         </li>
//       ))
//     }
//
//     </h1>
//   )
// }
// }
// export default Home
