import React, { Component } from 'react'
import { observer } from 'mobx-react';
import Status from './status.js'
import Actions from '../actions/index'
import store from '../store/index'

@observer
class Header extends Component {
  constructor(props) {
    super(props)
    this.editDone = this.editDone.bind(this)
  }

  componentDidUpdate() {
    console.log('header did update.')

    // 使用mobx可以避免判断shouldComponentUpdate
    // 对于ref的使用，也有一些冲突
    // 如果使用this.ipt.value去更新值，那么不会触发header的更新，因为这里数据是直接从store拿的
    // 不是props传递下来的，所以mobx会认为组件没有发生变化，从而导致编辑的时候不更新
    // const { editId, editVal } = store
    
    // if (editId > 0 && editVal) {
    //   this.ipt.value = editVal
    //   this.ipt.focus()
    // }
  }

  componentDidMount() {
    console.log('header did Mount.')
  }

  onChange(e) {
    store.editVal = e.target.value
  }

  editDone(event) {
    if (event.keyCode !== 13) {
      return
    }

    const { editId, editVal } = store
    const isUpdate = editId > 0
    // const newVal = this.ipt.value

    if (isUpdate) {
      Actions.updateItem({
        id: editId,
        val: editVal
      })
    } else {
      Actions.addItem(editVal)
    }

    // this.ipt.value = ''
  }

  render() {
    // 对于这种不需要及时抛出input动态值的case（动态的比如搜索框）
    // 不需要onChange去更新input值，在最终使用的时候通过原生拿即可
    const { editId, editVal } = store
    
    return (
      <div className="header">
        <input type="text" className="ipt"
          value={editVal}
          onChange={this.onChange}
          // ref={ipt => this.ipt = ipt}
          onKeyUp={this.editDone}
          placeholder="what your focus today"
        />
      </div>
    )
  }
}

export default Header