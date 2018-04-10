import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './component/header'
import List from './component/list'
import Filter from './component/filter'
import Status from './component/status'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editId: -1,
      editVal: '',
      count: 0,
      filter: Status.All,
      list: [],
    }

    this.updateState = this.updateState.bind(this)
    this.appendOrUpdateItem = this.appendOrUpdateItem.bind(this)
  }

  updateState(newState) {
    let state = { ...this.state, ...newState }
    this.setState(state)
  }

  appendOrUpdateItem(args) {
    const { isUpdate, editItem, index } = args
    let newList

    if(isUpdate) {
      newList = this.state.list.splice(index, 1, editItem)
    } else {
      newList = this.state.list.concat([editItem])
    }

    this.setState({
      count: newList.length,
      list: newList,
      editId: -1,
      editVal: '',
    })
  }

  componentDidMount() {
    console.log('App did Mount.')
  }

  componentDidUpdate() {
    console.log('App did update.')
  }

  render() {
    return <div>
      <header className="p-hd">TODO List - React</header>
      <section className="content">
        <div className="box">
          <Header editItem={this.state} appendOrUpdateItem={this.appendOrUpdateItem} />
          <List list={this.state.list} filter={this.state.filter} updateState={this.updateState} />
          <Filter filter={this.state.filter} updateState={this.updateState} />
        </div>
      </section>
      <footer className="p-ft">Copyright Baotong.Wang 2018.</footer>
    </div>
  }
}

// ReactDOM.render(<App />, document.getElementById('container'))


const appInstance = React.createElement(App);
ReactDOM.render(appInstance, document.getElementById('container'))

// export default appInstance;

// appInstance.setState()
// appInstance.forceUpdate()

// listInstance.update()