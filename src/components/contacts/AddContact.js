import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
// import { v4 as uuidv4 } from 'uuid'; // dont need this with an api, api assigns this for us
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addContact } from '../../actions/contactActions'



class AddContact extends Component {
  // This is the state for the component, 
  // this is to store what data we get from the form
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
  };
  
  // This function will fire when a user types in an input box. 
  // The e.target.name will be equal to the input element's name field 
  // The e.target.value will be equal to the value in the input element.
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // this function will be called when the form is submitted.async was added only for api
  onSubmit = (e) => {
    e.preventDefault();
    // creating variables to store our state values.
    const { name, email, phone } = this.state; // instead of typing this.state.name
    
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
    
    // create a newContact object 
    const newContact = {
      name,
      email,
      phone
    }
     // SUBMIT CONTACT
    this.props.addContact(newContact);

    this.props.history.push("/");
  }
  
  render() {
    const { name, email, phone, errors } = this.state;
    return (
        <Fragment>
              <h1 className="display-4 text-primary">Add New Contact</h1>
              <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label>Name</label>
                      <input 
                        type="text"  
                        className={classnames("form-control", { 'is-invalid' : errors.name })  }
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={this.onChange}
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
                        value={email}
                        onChange={this.onChange}
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
                        value={phone}
                        onChange={this.onChange}
                      />
                      {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                    </div>
                    <input type="submit" value="Add Contact" className="btn btn-light btn-block" />
                  </form>
                </div>
                
              </div>   {/* end of the card */}
            </Fragment>  
           )}}

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired,
}

export default connect(null, {addContact})(AddContact);