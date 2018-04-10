import React, { Component } from 'react'
import Status from './status'
import Actions from '../actions/actions'

class ListItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { li } = this.props

    if(li.status !== nextProps.li.status || li.val !== nextProps.li.val) {
      return true
    }

    return false
  }

  componentDidUpdate() {
    const { li } = this.props
    const { val, status } = li
    console.log(`listitem: ${val}-${status} did update.`)
  }

  componentWillUnmount() {
    const { li } = this.props
    const { val, status } = li
    console.log(`listitem: ${val}-${status} did unmount.`)
  }

  componentDidMount() {
    console.log('listitem did Mount.')
  }

  onItemCheck = event => {
    const item = Object.assign({}, this.props.li)

    item.status = this.chk.checked ? Status.Complete : Status.Active

    Actions.updateItem(item)
  }

  deleteItem = event => {
    Actions.deleteItem(this.props.li.id)
  }

  changeItem(txt) {
    const { li } = this.props

    Actions.selectItem({
      editId: li.id,
      editVal: txt
    })
  }

  render() {
    let { li } = this.props
    let attr = false, cls = ''

    switch (li.status) {
      case Status.Active:
        break
      case Status.Complete:
        attr = true
        break
      case Status.Delete:
        attr = true
        cls = 'delete'
        break
    }

    return (
      <li className={cls}>
        <span className="chk">
          <input type="checkbox" ref={(target) => this.chk = target}
            name="status" checked={attr}
            onChange={this.onItemCheck} 
          />
        </span>
        <span className="val" 
          onClick={() => this.changeItem(li.val)}>
          {li.val}
        </span>
        <span className="oper">
          <a href="javascript:" className="del" 
            onClick={this.deleteItem}>
            Delete
          </a>
        </span>
      </li>
    )
  }
}

export default ListItem