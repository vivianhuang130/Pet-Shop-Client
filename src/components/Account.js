import React, { Component } from 'react'
import auth from '../auth'

class Account extends Component{
  constructor(props){
    super(props)
    this.state = {products: [], orders: []}
  }

  componentDidMount(){
    auth.getOrders()
      .then((orders)=>{
        console.log(orders)
        this.setState({orders: orders.data})
      })
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
  handleDeleteSubmit(id, evt){
    evt.preventDefault()
    console.log('deleting account')
    auth.deleteUser(id)
    .then((err) => {
      this.props.parent.setCurrentUser()
      this.setState({shouldRedirect: true})
    })
  }

  render(){
    return (
      <div>
        <div className="user-info">
          <h1>Edit User Info <span role='img' aria-label="Emoji blond">🙋</span></h1>
          <p>Name: {this.props.currentUser.name}</p>
          <br/>
          <p>Email: {this.props.currentUser.email}</p>
          <h2>{this.props.currentUser.password}</h2>
          {console.log(this.props.currentUser)}
        </div>
        <div className="update">
          <form onSubmit={this.handleEditSubmit.bind(this, this.props.currentUser._id)}>
            Update name: <input className="form" ref='name' type="text" defaultValue={this.props.currentUser.name} />
            <br />
            Update email: <input className="form" ref='email' type="text" defaultValue={this.props.currentUser.email} />
            <div>
              <button className="update-delete-account-button">Update Account</button>
              <button className="update-delete-account-button" onClick ={this.handleDeleteSubmit.bind(this, this.props.currentUser._id)}>Delete Account</button>
            </div>
          </form>
        </div>
        <div className="order-history">
          <h1>Order History</h1>
            {this.state.orders.reverse().map((o) => (
              <div id='order' key={o._id}>
                Created At: {o.createdAt}
                <br/>
                Quantity: {o.products.length}
                  {o.products.map((p, i)=> (
                    <li key={i}>
                      <p>Name: { p.name } </p> <br/>
                      <p>Price: ${p.price}</p>
                    </li>
                  ))}
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default Account
