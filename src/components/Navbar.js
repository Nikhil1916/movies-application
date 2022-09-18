import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:"brown",padding:'2rem'}}>
        <h1 style={{marginRight:'2rem',marginLeft:'0.5rem'}}>Movies App</h1>
        <h3>Favourites</h3>
      </div>
    )
  }
}
