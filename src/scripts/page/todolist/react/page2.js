import React, { Component } from 'react'
const { Link } = require('react-router-dom');

class Page2 extends Component {
  render() {
    return (
      <div style={{
        height:'100%',
        bachgroundColor:'green',
      }}>
        <header className="p-hd">Page2</header>
        <Link to="/p3" >goto page3</Link>
      </div>
    )
  }
}

export default Page2;