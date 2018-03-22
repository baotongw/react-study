import React, { Component } from 'react'
import { observer } from 'mobx-react';
import Status from './status'
import Actions from '../actions/index'
import store from '../store/index'

@observer
class Filter extends Component {
  constructor() {
    super()

    this.onItemClick = this.onItemClick.bind(this)
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.filter !== nextProps.filter
  // }

  componentDidUpdate() {
    console.log('filter did update.')
  }

  componentDidMount() {
    console.log('filter did Mount.')
    // this.currentFilter = this.props.filter
  }

  onItemClick(newFilter) {
    Actions.setFilter(newFilter)
  }

  render() {
    let { filter } = store
    let btns = []

    for (let option in Status) {
      btns.push(Status[option])
    }

    const doms = btns.map((btn, i) => {
      let cls = 'key' + (filter === btn ? ' active' : '')

      return (
        <a key={i} filter={'filter-' + i} 
          href="javascript:" 
          onClick={() => this.onItemClick(btn)} 
          className={cls}>
          {btn}
        </a>
      )
    })

    return <div className="querys">{doms}</div>
  }
}

export default Filter