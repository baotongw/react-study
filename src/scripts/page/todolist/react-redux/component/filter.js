import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Status } from '../constant'
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
  }

  onItemClick(newFilter) {
    this.props.setFilter(newFilter)
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

function mapStateToProps(state) {
  const { filter } = state.filterReducer

  return { filter }
} 

function mapDispatchToProps(dispatch) {
  return { 
    setFilter: args => dispatch(setFilter(args)),
  }
}

const wrapper = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default wrapper
