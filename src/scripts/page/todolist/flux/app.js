import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './component/header'
import List from './component/list'
import Filter from './component/filter'
import Status from './component/status'
import Store from './store/index'

class App extends Component {
  constructor() {
    super()
    // init阶段拿数据
    // this.state = Store.getState()

    // this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    // Store.registeChangeHandler(this.onChange)
    console.log('app did Mount.')
  }

  componentWillUnmount() {
    // Store.removeChangeHandler(this.onChange)
    console.log('app will unmount.')
  }

  componentDidUpdate() {
    console.log('app did update.')
  }

  onChange() {
    // 运行阶段的onChange
    // 这里简单起见直接拿所有数据
    // 也可以想mapStateToProps一样，每个component定制一个取数据规则
    const state = Store.getState()
    // 这里自顶向下传递数据
    this.setState(state)
  }

  render() {
    // const { list, filter } = this.state
    return (
      <div>
        <header className="p-hd">
          TODO MVC - React-Flux
        </header>
        <section className="content">
          <div className="box">
            <Header />
            <List />
            <Filter />            
          </div>
        </section>
        <footer className="p-ft">Copyright Baotong.wang 2017.</footer>
      </div>
    )
  }

  // <Header states={this.state} />
  // <List list={this.state.list} filter={this.state.filter} />
  // <Filter filter={this.state.filter} />
}

ReactDOM.render(<App />, document.getElementById('container'))