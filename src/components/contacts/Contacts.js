// import React and installed components
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; //impt 

import Contact from './Contact';
import { getContacts } from '../../actions/contactActions';

class Contacts extends Component {
  // get this contacts from the API
  componentDidMount(){
    this.props.getContacts();
  }
  
  render() {
    const { contacts } = this.props;
    return (
      <Fragment>
        <h1 className='display-4 text-primary'>Contact List</h1>
        {
          // we are checking the contacts array for each of the contact objects
          contacts.map(contact => (
          // This passes the contact object to the Contact component
          <Contact key={contact.id} contact={contact} />
          ))
        }
      </Fragment>
    )
  } // End of Render 
} // End of Component Contacts

Contacts.propTypes = {
  //shortcut ptfr and ptar
  getContacts: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  contacts: state.contact.contacts
})

export default connect(mapStateToProps, { getContacts })(Contacts)