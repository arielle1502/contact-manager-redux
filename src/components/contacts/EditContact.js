import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getContact, updateContact } from '../../actions/contactActions'

class EditContact extends Component {
  
  state = {
    name:'',
    email:'',
    phone:'',
    errors: {},
  };
 
  componentWillReceiveProps(nextProps, nextState){
    const { name, email, phone } = nextProps.contact;
    this.setState({
      name: name,
      email: email,
      phone: phone
    });
  }

  // using a componentdidmount onyl for use with api
  componentDidMount(){
    // get our id from URL
    const { id } = this.props.match.params;
    this.props.getContact(id);
    
    
  }
// this on change function was added only for api/can be deleted for use without api
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // this function will be called when the form is submitted.
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit: update")

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
    const { id } = this.props.match.params;
    // create a updated Contact object 
    const updContact = {
      id,
      name: name,
      email: email,
      phone: phone
    }
    
     // send the updated contact to an api or state managment.
    console.log(updContact);

    // call the updateContact function
    this.props.updateContact(updContact);
    // redirect the browser back to the contacts page ('/')
    this.props.history.push("/");
  }
  
  render() {
    // pull out the id from the url
    // const cid = this.props.match.params;//comment out for api
    // pull the errors out of state.
    const { name, email, phone, errors } = this.state;//is only errors if not using api
    return (
        <Fragment>
              <h1 className="display-4 text-primary">Edit Contact</h1>
              <div className="card mb-3">
                <div className="card-header">Update Contact</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
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
           )
          }
        }
     

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  contact: state.contact.contact
})

export default connect(mapStateToProps, { getContact, updateContact })(EditContact);