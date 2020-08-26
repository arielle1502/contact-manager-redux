import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Consumer } from '../../context';
import axios from 'axios';


class Contact extends Component {
  state = {
    showContactInfo: false
  }
  
  onShowClick = e => {
    console.log('OnShowClick');
    this.setState({ showContactInfo: !this.state.showContactInfo });
  }
  
  delClick = async (id, dispatch) => {
    console.log("delete: " + id);
    // this if for the old way when we passed the the function through.
    // This calls the function in contacts.js (parent component) and will pass the id through.
    // this.props.delContact(id);
    // we now dispatch our action to the reducer so it can update the state.
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  }
  
  // This will render our contact object passed from contacts.
  render() {
    // pull the variables from the props (as this is passed from the Contacts component)
    const { name, email, phone, id } = this.props.contact;
    // Pull value out of the state.
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        { value => {
          const { dispatch } = value; // this is pulling our dispatch function in our Consumer
          return (
            <div className='card card-body mb-3'>
              <h2>
                { name }{' '}
                <FontAwesomeIcon icon='sort-down' onClick={this.onShowClick} style={{ cursor: "pointer"}}>
                </FontAwesomeIcon>
                {/* This onclick call the local delClick function */}
                <FontAwesomeIcon icon='times' style={{ cursor: "pointer", float: "right", color: "red", marginLeft: '10px'  }}
                  onClick={this.delClick.bind(this, id, dispatch)}
                > 
                </FontAwesomeIcon>
                
                <Link to={`/contact/edit/${id}`}>
                <FontAwesomeIcon icon='pencil-alt' 
                    style={{ cursor: "pointer", float: "right"  }}>
                  </FontAwesomeIcon>
                </Link>
              </h2>
              { showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className='list-group-item'>Phone: {phone}</li>
                </ul>
              ) : null 
              }
            </div>
          )}} 
          {/* this is end the inner return and value sections */}
      </Consumer>
    ) // this closes the outer return
  }
}

Contact.defaultProps = {
  name: 'Jade Doe',
  email: 'jadedoe@gmail.com',
  phone: '(555)-444-5555'
}

Contact.propTypes = {
  contact: PropTypes.object,
}

export default Contact