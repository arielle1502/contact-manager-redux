import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { Consumer } from '../../context';
import axios from 'axios';

class EditContact extends Component {
  // The state only holds the errors as we are using refs to hold the values from the form(added name, email phone back in onyl for api functionality)
  state = {
    name:'',
    email:'',
    phone:'',
    errors: {},
  };
  
  // create the refs to hold the values from the form.Dont need them for the api
  // nameInput = React.createRef();
  // emailInput = React.createRef();
  // phoneInput = React.createRef();

  // using a componentdidmount onyl for use with api
  async componentDidMount(){
    // get our id from URL
    const { id } = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
  }
// this on change function was added only for api/can be deleted for use without api
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // this function will be called when the form is submitted.
  handleSubmit = async (dispatch, e) => {
    e.preventDefault();
    console.log("Submit: update")

    // creating variables to store our values.
    // Pull the id out of the url
    const { id } = this.props.match.params;
    // the below was commented out for the API functionality!from here
    // // get the current value from the form using the refs we set up.
    // const name = this.nameInput.current.value;
    // const email = this.emailInput.current.value;
    // const phone = this.phoneInput.current.value;
    // console.log(name + ' ' + email + ' ' + phone)//to here

    // this is shortcut so we dont have type this.sate.name, etc
    const { name, email, phone} = this.state;

    // Check for Errors
    
    if (name === ''){
      // this sets errors.name state value
      this.setState({ errors: {name: 'Name is required '}});
      return; // this will stop the onSubmit from running
    }
    if (email === ''){
      // this sets errors.name state value
      this.setState({ errors: {email: 'Email is required '}});
      return; // this will stop the onSubmit from running
    }
    if (phone === ''){
      // this sets errors.name state value
      this.setState({ errors: {phone: 'Phone is required '}});
      return; // this will stop the onSubmit from running
    }
    // we call also use Bootstrap -isValid -isInvalid 
    // we can change the classes dynamically. 
    
    // create a updated Contact object 
    const updContact = {
      // id: id, dont need for api
      name: name,
      email: email,
      phone: phone
    }
    
     // send the updated contact to an api or state managment.
    console.log(updContact);

    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

    // this is where we would call our dispatch function
    // dispatch our updated contact to the global state
    dispatch({ type: 'UPDATE_CONTACT', payload: res.data});//replaced updContact with res.data

    // redirect the browser back to the contacts page ('/')
    this.props.history.push("/");
  }
  
  render() {
    // pull out the id from the url
    // const cid = this.props.match.params;//comment out for api
    // pull the errors out of state.
    const { name, email, phone, errors } = this.state;//is only errors if not using api
    return (
      <Consumer>
        { value => {
          const { dispatch } = value; //removed contacts for api
          // get the contact from the state by finding the contact in the 
          // contacts array by matching the cont.id to the cid from the url
          // const contact = contacts.find(cont => cont.id === cid.id);//commented out for api
          return (
            <Fragment>
              <h1 className="display-4 text-primary">Edit Contact</h1>
              <div className="card mb-3">
                <div className="card-header">Update Contact</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                    <div className="form-group">
                      <label>Name</label>
                      <input 
                        type="text"  
                        className={classnames("form-control", { 'is-invalid' : errors.name })  }
                        placeholder="Name"
                        name="name"
                        // set the default value for the form (contact.name)
                        // defaultValue={contact.name}//commented out for api
                        // use the nameInput ref here
                        value={name}//ref={this.nameInput} changed for api
                        onChange={this.onChange}//added for api
                        
                      />
                      {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email"  
                        className={classnames("form-control", { 'is-invalid' : errors.email })  }
                        placeholder="Email"
                        name="email"
                        // set the default value for the form (contact.email)
                        // defaultValue={contact.email}//commented out for api
                        // use the emailInput ref here
                        value={email}//ref={this.emailInput}
                        onChange={this.onChange}//added for api
                      />
                      {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input 
                        type="text"  
                        className={classnames("form-control", { 'is-invalid' : errors.phone })  } 
                        placeholder="Phone"
                        name="phone"
                        // set the default value for the form (contact.phone)
                        // defaultValue={contact.phone}//commented out for api
                        // use the phoneInput ref here
                        value={phone}//ref={this.phoneInput}
                        onChange={this.onChange}//added for api
                      />
                      {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                    </div>
                    <input type="submit" value="Update Contact" className="btn btn-light btn-block" />
                  </form>
                </div>
                
              </div>   {/* end of the card */}
            </Fragment>  
           )}}
      </Consumer>
    )
  }
}

export default EditContact;