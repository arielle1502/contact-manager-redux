import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotFound = () => {
  return (
    <div className="text-center">
      <h2>
        <span className="text-danger">
          <FontAwesomeIcon icon="exclamation-triangle"/>
        </span> 
        {' '}OOPS...
      </h2>
      <h2>This page is not here</h2>
      <p>Please check your url and try again.</p>
    </div>
  )
}

export default NotFound