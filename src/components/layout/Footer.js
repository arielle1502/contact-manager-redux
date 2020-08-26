import React from 'react'

const Footer = () => {
  const date = new Date();
  return (
    <div className='bg-danger'>
      <p className='py-2 ml-5 mr-auto text-white'>
        copyright { String.fromCharCode(169)}
        {' ' + date.getFullYear()} Websites 'R' Us
      </p>
      
    </div>
  )
}

export default Footer
