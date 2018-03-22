import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './component/header'
import List from './component/list'
import Filter from './component/filter'
import Status from './component/status'

class App extends Component {
  
  componentDidMount() {
    console.log('App did Mount.')
  }

  componentDidUpdate() {
    console.log('App did update.')
  }

  render() {
    return (
      <div>
        <header className="p-hd">TODO List - React</header>
        <section className="content">
          <div className="box">
            <Header />
            <List />
            <Filter />
          </div>
        </section>
        <footer className="p-ft">Copyright Baotong.Wang 2018.</footer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'))