import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', color: 'blue' }} className='navbar'>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ marginRight: '2rem', marginLeft: '0.5rem' }}>Movies App</h1>
        </Link>
        <Link to="/fav" style={{ textDecoration: 'none' }}>
          <h3>Favourites</h3>
        </Link>
      </div>
    </div>
  )
}
export default Navbar;
