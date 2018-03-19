import React, { Component } from 'react'
import Status from './status'
import ListItem from './listItem'

class List extends Component {
  constructor(props) {
    super(props)

    this.updateItem = this.updateItem.bind(this)
    this.selectItem = this.selectItem.bind(this)
  }

  componentDidUpdate() {
    console.log('list did update.')
  }

  componentDidMount() {
    console.log('list did Mount.')
  }

  updateItem(item) {
    // 这里修改的item都是共享的同一份引用
    let { list = [], updateState } = this.props

    const newList = list.map(li => li.id === item.id ? item : li)

    updateState({ list: newList })
  }

  selectItem(args) {
    this.props.updateState(args)
  }

  render() {
    let { list = [], filter } = this.props
    let checkKey = filter !== Status.All

    let doms = list.map(li => {
      // only show the filter matched item
      if (checkKey && li.status !== filter) {
        return ''
      }

      return (
        <ListItem
          key={li.id}
          filter={'list-' + li.id}
          li={li}
          selectItem={this.selectItem}
          updateItem={this.updateItem} />
      )
    })

    return <div className="list">
      <ul className="i-list">{doms}</ul>
    </div>
  }
}

export default List