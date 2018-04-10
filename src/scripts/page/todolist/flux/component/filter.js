import React, { Component } from 'react'
import Status from './status'
import Actions from '../actions/actions'
import Store from '../store/index'

class Filter extends Component {
  constructor(props) {
    super()

    const { filter } = Store.getState()

    this.state = { filter }

    this.StatusArr = []

    for(let key in Status) {
      this.StatusArr.push(Status[key])
    }
  }

  onItemClick(btn) {
    let { filter } = this.state

    if (btn === filter) {
      return
    }

    Actions.setFilter(btn)
  }

  componentDidMount() {
    Store.registeChangeHandler(this.onChange)
  }

  componentWillUnmount() {
    Store.removeChangeHandler(this.onChange)
  }

  onChange = () => {
    const { filter } = Store.getState()

    if(this.state.filter !== filter) {
      this.setState({ filter })
    }
  }

  render() {
    let { filter } = this.state

    let doms = this.StatusArr.map((status, i) => {
      let cls = 'key' + (filter === status ? ' active' : '')

      return (
        <a key={i} filter={'filter-' + i} 
          href="javascript:" 
          className={cls}
          onClick={() => this.onItemClick(status, i)}>{status}
        </a>
      )
    })

    return <div className="querys">{doms}</div>
  }
}

export default Filter