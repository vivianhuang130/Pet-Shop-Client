import React from 'react'


const Account = (props) => {
  return(
    <h1>My Account🙋🏻</h1>
  )
}
export default Account


// 
// import React from 'react'
// import {NavLink} from 'react-router-dom'
// import axios from 'axios'
//
// class Account  extends React.Component{
//   constructor(props){
//     super(props)
//     this.state = {accounts: []}
//     this.request = axios.create({baseURL: 'http://localhost:3001/api'})//this until here represents defaults
// //'https://evening-springs-26292.herokuapp.com/api'
//   }
//
// componentDidMount(){
//   this.request({method: 'GET', url: '/accounts'})
//   .then((order)=>{
//     console.log("?");
//
//     console.log(order.data);
//     this.setState({accounts: order.data})
//     console.log(this.state);
//   })
// }
//
//   render(){
//     return (
//
//       <div className="container text-center">
//         <h1>Products viVIAN</h1>
//         <div className="row">
//           <div className="col-sm-3">
//             {this.state.accounts.map((o) => (
//               <li id='accounts' key={o._id}>
//
//
//
//                 <img src={o.logoUrl} height="10%" width ="10%" />
//
//                 <p>${o.count}</p>
//                 {/* <p>{p.description}</p> */}
//
//
//               </li>
//             ))}
//           </div>
//           </div>
//           </div>
//
//     )
//   }
// }
//
// export default Account
