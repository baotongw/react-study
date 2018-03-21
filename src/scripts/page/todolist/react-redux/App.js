import React, { Component } from 'react'
import Header from './component/header'
import List from './component/list'
import Filter from './component/filter'
import Status from './component/status'
import store from './reducer/index'

class App extends Component {

  componentDidMount() {
    console.log('App did Mount.')
  }

  componentWillUnmount() {
    console.log('App did update.')
  }

  render() {
    return (
      <div>
        <header className="p-hd">TODO List - react + react-redux</header>
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

export default App
