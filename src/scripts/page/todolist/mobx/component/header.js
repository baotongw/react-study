import React, { Component } from 'react'
import { observer } from 'mobx-react';
import Status from './status.js'
import { addItem, updateItem } from '../actions/index'
import store from '../store/index'

@observer
class Header extends Component {
  constructor(props) {
    super(props)
    this.editDone = this.editDone.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { editId, editVal } = store

    if (editId > 0 && editVal) {
      this.ipt.value = editVal
      this.ipt.focus()
    }
  }

  componentDidUpdate() {
    console.log('header did update.')
  }

  componentDidMount() {
    console.log('header did Mount.')
  }

  editDone(event) {
    if (event.keyCode !== 13) {
      return
    }

    const { editId } = this.store
    const isUpdate = editId > 0
    const newVal = this.ipt.value

    if (isUpdate) {
      updateItem({
        id: editId,
        val: newVal
      })
    } else {
      addItem(newVal)
    }

    this.ipt.value = ''
  }

  render() {
    // 对于这种不需要及时抛出input动态值的case（动态的比如搜索框）
    // 不需要onChange去更新input值，在最终使用的时候通过原生拿即可
    return (
      <div className="header">
        <input type="text" className="ipt"
          ref={ipt => this.ipt = ipt}
          onKeyUp={this.editDone} />
      </div>
    )
  }
}

export default Header