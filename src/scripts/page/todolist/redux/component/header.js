import React, { Component } from 'react'
import Status from './status.js'
import { dispatch } from '../reducer/index'
import { addItem, editItem as updateItem } from '../action/index'

class Header extends Component {
  constructor(props) {
    super(props)
    this.editDone = this.editDone.bind(this)
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log('header-componentWillReceiveProps')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('header-shouldComponentUpdate')
    const { editItem } = nextProps
    const { editId, editVal } = editItem
    
    return editId !== nextProps.editItem.editId || editVal !== nextProps.editItem.editVal
  }

  componentDidUpdate() {
    console.log('header did update.')
    // 刚进入页面不会有editItem，所以放到DidUpdate没问题
    const { editItem } = nextProps
    const { editId, editVal } = editItem

    if (editId > 0 && editVal) {
      this.ipt.value = editVal
      this.ipt.focus()
    }
  }

  componentDidMount() {
    console.log('header did Mount.')
  }

  editDone(event) {
    if (event.keyCode !== 13) {
      return
    }

    const { editId } = this.props.editItem
    const isUpdate = editId >  0
    const newVal = this.ipt.value

    if(isUpdate) {
      dispatch(updateItem({
        id: editId, 
        val: newVal
      }))
    } else {
      dispatch(addItem(newVal))
    }

    this.ipt.value = ''
  }

  render() {
    // 对于这种不需要及时抛出input动态值的case（动态的比如搜索框）
    // 不需要onChange去更新input值，在最终使用的时候通过原生拿即可
    return (
      <div className="header">
        <input type="text" className="ipt" 
          ref ={ipt => this.ipt = ipt}
          onKeyUp={this.editDone}
          placeholder="what your focus today"
        />
      </div>
    )
  }
}

export default Header