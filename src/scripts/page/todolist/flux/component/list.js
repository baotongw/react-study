import React, { Component } from 'react'
import Status from './status'
import ListItem from './listItem'
import Actions from '../actions/actions'
import Store from '../store/index'

const isShallowEquals = (pre = [], next = []) => {
  if(pre.length !== next.length) {
    return false
  }

  for(let i = 0, len = pre.length; i < len; i++) {
    if(pre[i] !== next[i]) {
      return false
    }
  }

  return true;
}

class List extends Component {
  constructor(props) {
    super(props)

    const { filter, list } = Store.getState()

    this.state = { filter, list }
  }

  componentDidMount() {
    Store.registeChangeHandler(this.onChange)
  }

  componentWillUnmount() {
    Store.removeChangeHandler(this.onChange)
  }

  onChange = () => {
    const { filter, list =[] } = Store.getState()
    
    this.setState({ filter, list })
  }

  updateItem(item) {
    Actions.updateItem(item.id, item.val)
  }

  render() {
    let { list = [], filter } = this.state
    let checkKey = filter !== Status.All

    let doms = list.map(li => {
      // only show the filter matched item
      if (checkKey && li.status !== filter) {
        return null
      }

      return <ListItem key={li.id} filter={'list-' + li.id} li={li} />
    })

    return (
      <div className="list">
        <ul className="i-list">{doms}</ul>
      </div>
    )
  }
}

export default List