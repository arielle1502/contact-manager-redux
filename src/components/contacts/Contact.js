import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import {deleteContact} from '../../actions/contactActions'

class Contact extends Component {
  state = {
    showContactInfo: false
  }
  
  onShowClick = e => {
    console.log('OnShowClick');
    this.setState({ showContactInfo: !this.state.showContactInfo });
  }
  
  delClick = id => {
    console.log("delete: " + id);
    this.props.deleteContact(id);
  }
  
  // This will render our contact object passed from contacts.
  render() {
    // pull the variables from the props (as this is passed from the Contacts component)
    const { name, email, phone, id } = this.props.contact;
    // Pull value out of the state.
    const { showContactInfo } = this.state;
    return (
      
            <div className='card card-body mb-3'>
              <h2>
                { name }{' '}
                <FontAwesomeIcon icon='sort-down' onClick={this.onShowClick} style={{ cursor: "pointer"}}>
                </FontAwesomeIcon>
                {/* This onclick call the local delClick function */}
                <FontAwesomeIcon icon='times' style={{ cursor: "pointer", float: "right", color: "red", marginLeft: '10px'  }}
                  onClick={this.delClick.bind(this, id)}
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
          )
        }}
         

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
}

export default connect(null, { deleteContact})(Contact)