import React from 'react'
import {NavLink} from 'react-router-dom'
import auth from '../auth'

class Account extends React.Component{
  constructor(props){
    super(props)
    this.state = {products: []}
  }

componentDidMount(){
  // this.request({method: 'GET', url: '/products'})
  // .then((prod)=>{
  //   console.log("?");
  //
  //   console.log(prod.data);
  //   this.setState({products: prod.data})
  //   console.log(this.state);
  // })


  // auth.getUserOrders().then(response => {
  // // console.log(response)
  // // set the state to contain the orders you get back from server.
  // })
}

handleEditSubmit(id,evt){
  evt.preventDefault()
  const formData = {
    name: this.refs.name.value,
    email: this.refs.email.value
  }
  console.log("CREATING ACCOUNT...");
  console.log(formData);
  auth.editUser(formData,id).then((err)=>{
    this.props.parent.setCurrentUser()
  })


}


  render(){
    return (
      <div>
      <div className="User-Info">
          <h1>Edit User Info🙋🏻</h1>
          <h2>{this.props.currentUser.name}</h2>
          <h2>{this.props.currentUser.email}</h2>
          <h2>{this.props.currentUser.password}</h2>
          {console.log(this.props.currentUser)}
      </div>
          <form onSubmit={this.handleEditSubmit.bind(this, this.props.currentUser._id)}>
            <input ref='name' type="text" defaultValue={this.props.currentUser.name} />
            <input ref='email' type="text" defaultValue={this.props.currentUser.email} />
            <button>Update</button>
        </form>
        <div className="OrderHistory">
            <h1>Order History🙋🏻</h1>
        </div>
      </div>
      )
  }
}

export default Account
