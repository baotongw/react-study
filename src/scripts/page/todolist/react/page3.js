import React, { Component } from 'react'
const { Link } = require('react-router-dom');

class Page3 extends Component {
  render() {
    return (
      <div style={{
        height:'100%',
        bachgroundColor: 'blue',
      }}>
        <header className="p-hd">Page3</header>
        <Link to="/" >back to page1</Link>
      </div>
    )
  }
}

export default Page3;