import React, { Component } from 'react'
import Status from './status'

class Filter extends Component {
  constructor() {
    super()

    this.currentFilter = null

    this.onItemClick = this.onItemClick.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.filter !== nextProps.filter
  }

  componentDidUpdate() {
    console.log('filter did update.')
  }

  componentDidMount() {
    console.log('filter did Mount.')
    this.currentFilter = this.props.filter
  }

  onItemClick(newFilter) {
    let { filter, updateState } = this.props

    if (newFilter === filter) {
      return
    }

    this.currentFilter = newFilter

    updateState({
      filter: newFilter
    })
  }
  render() {
    let { filter } = this.props
    let btns = []

    for (var option in Status) {
      btns.push(Status[option])
    }

    let doms = btns.map((btn, i) => {
      let cls = 'key' + (filter === btn ? ' active' : '')

      return <a key={i} filter={'filter-' + i} href="javascript:" onClick={() => this.onItemClick(btn)} className={cls}>{btn}</a>
    })

    return <div className="querys">{doms}</div>
  }
}

export default Filter