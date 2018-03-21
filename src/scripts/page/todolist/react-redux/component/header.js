import React, { Component } from 'react'
import { connect } from 'react-redux'
import Status from './status.js'
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
    const { editId, editVal } = nextProps
    
    return editId !== this.props.editId || editVal !== this.props.editVal
  }

  componentDidUpdate() {
    console.log('header did update.')
    const { editId, editVal } = this.props

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

    const { editId } = this.props
    const isUpdate = editId >  0
    const newVal = this.ipt.value

    if(isUpdate) {
      this.props.updateItem({
        id: editId, 
        val: newVal
      })
    } else {
      this.props.addItem(newVal)
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
          onKeyUp={this.editDone} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { editId, editItem } = state.headerReducer

  return { editId, editItem }
} 

function mapDispatchToProps(dispatch) {
  return { 
    addItem: args => dispatch(addItem(args)), 
    updateItem: args => dispatch(updateItem(args)),
  }
}

const wrapper = connect(mapStateToProps, mapDispatchToProps)(Header)

export default wrapper
