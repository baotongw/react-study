import React, { Component } from 'react'
const { Link } = require('react-router-dom');

class Page1 extends Component {
  render() {
    return (
      <div>
        <header className="p-hd">Page1</header>
        <Link to="/p2" >goto page2</Link>
      </div>
    )
  }
}

export default Page1;