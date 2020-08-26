import React, { Component } from 'react'

export default class Test extends Component {
  state = {
    message: 'Hello'
  }
  componentDidMount(){
    // runs when the component has rendered when it has mounted
    console.log("Component did mount!");
    // this si the place we would make calls to an api if we were using one
  }

  componentDidUpdate(){
    // this runs if there is any change to the state
    console.log("State Changed!")
  }
// because we are using only one parameter here, we dont need brackets
  onChange = e => {
    this.setState({
    [e.target.name]: e.target.value
   });
  }

  onSubmit = (e) =>{
    e.preventDefault();
    console.log("Submit");

  }
  render() {
    const { message } = this.state;
    return (
      <div>
        <h1>Test Component</h1>
        <p>Page to Test Lifecycle methods</p>
        <p>{ message }</p>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <label htmlFor="newMessage">New Message</label>
        <input 
         type="text" 
         className="form-control" 
         id="newMessage" 
         placeholder="New Message"
         name="message"
         value={message}
         onChange={this.onChange}/>
        </div>
        <button type="submit" className=" btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
