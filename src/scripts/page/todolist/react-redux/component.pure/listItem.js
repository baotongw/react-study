import React, { Component } from 'react'
import { connect } from 'react-redux'
import Status from './status'
import { selectItem, deleteItem, editItem as updateItem } from '../action/index'

class ListItem extends Component {
  constructor(props) {
    super(props)

    this.onItemCheck = this.onItemCheck.bind(this)
    this.onItemDelete = this.onItemDelete.bind(this)
    this.onItemSelect = this.onItemSelect.bind(this)
  }

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

  onItemCheck(event) {
    const { li } = this.props

    this.props.updateItem({
      id: li.id,
      status: this.chk.checked ? Status.Complete : Status.Active
    })
  }

  onItemDelete(event) {
    const { li } = this.props
    this.props.deleteItem({
      id: li.id,
    })
  }

  onItemSelect(txt) {
    const { li } = this.props
    
    this.props.selectItem({
      editId: li.id,
      editVal: editVal,
    })
  }

  render() {
    let { li } = this.props
    let attr = false, cls = ''

    switch (li.status) {
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
          <input type="checkbox" 
            ref={(chk) => { this.chk = chk }} 
            name="status"
            checked={attr} 
            onChange={this.onItemCheck} />
        </span>
        <span className="val" 
          onClick={this.onItemSelect}>
          {li.val}
        </span>
        <span className="oper">
          <a href="javascript:" className="del" 
            onClick={this.onItemDelete}>
            Delete
          </a>
        </span>
      </li>
    )
  }
}

function mapDispatchToProps() {
  return { selectItem, deleteItem, updateItem }
}

const wrapper = connect(null, mapDispatchToProps)(ListItem)

export default wrapper
