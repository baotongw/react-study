import React, { Component } from 'react'
import { Status } from '../const'
import { dispatch } from '../reducer/index'
import { setFilter } from '../action/index'

class Filter extends Component {
  constructor() {
    super()

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
    // this.currentFilter = this.props.filter
  }

  onItemClick(newFilter) {
    dispatch(setFilter(newFilter))
  }

  render() {
    let { filter } = this.props
    let btns = []

    for (var option in Status) {
      btns.push(Status[option])
    }

    let doms = btns.map((btn, i) => {
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