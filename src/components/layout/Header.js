import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = props => {
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-3">
      <div className="container">
        <Link to="/" className="navbar-brand">{branding}</Link>
      </div>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link"><FontAwesomeIcon icon='home'></FontAwesomeIcon>
          {' '}Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link"><FontAwesomeIcon icon='question'></FontAwesomeIcon>
          {' '}About</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact/add" className="nav-link"><FontAwesomeIcon icon='plus'></FontAwesomeIcon>
          {' '}Add</Link>
        </li>
        <li className="nav-item">
          <Link to="/test" className="nav-link"><FontAwesomeIcon icon='question'></FontAwesomeIcon>
          {' '}Test</Link>
        </li>
      </ul>
    </nav>
  )
}

Header.propTypes = {
branding: PropTypes.string.isRequired,
}

export default Header
