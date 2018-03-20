import React, { Component } from 'react'
import Status from './status'

class ListItem extends Component {
  constructor(props) {
    super(props)

    this.onItemCheck = this.onItemCheck.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.changeItem = this.changeItem.bind(this)
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
    let { li, updateItem } = this.props
    
    const updateArgs = Object.assign({}, li) 
    updateArgs.status = this.chk.checked ? Status.Complete : Status.Active

    updateItem(updateArgs)
  }

  deleteItem(event) {
    let { li, updateItem } = this.props
    const updateArgs = Object.assign({}, li)
    updateArgs.status = Status.Delete

    // 不能这样改，这么改了还没setState状态就已经变了，因为改的是它的直接引用
    // 这样不能去做shouldComponentUpdate的判断
    // this.props.status === nextProps.status --> true
    // li.status = Status.Delete

    updateItem(updateArgs)
  }

  changeItem(txt) {
    let { li, selectItem } = this.props

    selectItem({
      editId: li.id,
      editVal: txt
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
          onClick={() => this.changeItem(li.val)}>{li.val}</span>
        <span className="oper">
          <a href="javascript:" className="del" 
            onClick={this.deleteItem} >Delete</a>
        </span>
      </li>
    )
  }
}

export default ListItem