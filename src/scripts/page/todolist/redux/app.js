import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './component/header'
import List from './component/list'
import Filter from './component/filter'
import Status from './component/status'
import store from './reducer/index'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = store.getState()
  }

  componentDidMount() {
    console.log('App did Mount.')

    // 订阅store change，得到unsubscribe方法
    this.unsubscribeToken = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    console.log('App did update.')

    // 解除订阅
    this.unsubscribeToken && this.unsubscribeToken()
  }

  render() {
    const { header, listReducer, filterReducer } = this.state
    const { count, list } = listReducer
    const { filter } = filterReducer

    return (
      <div>
        <header className="p-hd">TODO List - React</header>
        <section className="content">
          <div className="box">
            <Header editItem={header} />
            <List list={list} filter={filter} />
            <Filter filter={filter} />
          </div>
        </section>
        <footer className="p-ft">Copyright Baotong.Wang 2018.</footer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'))