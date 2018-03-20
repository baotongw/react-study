import React, { Component } from 'react'
import Status from './status.js'
import Actions from '../actions/actions'
import Store from '../store/index'

class Header extends Component {

  constructor(props) {
    super(props)

    const { editId, editVal } = Store.getState()

    this.state = { editId, editVal }

    this.editDone = this.editDone.bind(this)
  }

  componentDidMount() {
    Store.registeChangeHandler(this.onChange)
  }

  componentWillUnmount() {
    Store.removeChangeHandler(this.onChange)
  }

  componentDidUpdate() {
    let { editId, editVal } = this.state

    if (editId > 0 && editVal) {
      this.ipt.value = editVal
      this.ipt.focus()
    }
  }

  onChange = () => {
    const { editId, editVal } = Store.getState()

    // 有了这个就不怎么需要shouldComponentUpdate了
    if(this.state.editId !== editId || this.state.editVal !== editVal) {
      this.setState({
        editId,
        editVal,
      })
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { editId, editVal } = this.state
    
  //   return editId !== nextState.states.editId || editVal !== nextProps.states.editVal
  // }

  editDone(event) {
    if (event.keyCode !== 13) {
      return
    }

    let { list, editId } = this.state
    let isUpdate = editId > 0
    let text = this.ipt.value

    if (!text) {
      return
    }

    if (isUpdate) {
      let item = {
        id: editId,
        status: Status.Active,
        val: text
      }

      Actions.updateItem(item)
    } else {
      Actions.addItem(text)
    }

    this.ipt.value = ''
  }

  render() {
    return (
      <div className="header">
        <input type="text" className="ipt" 
          ref ={ipt => this.ipt = ipt}
          onKeyUp={this.editDone} />
      </div>
    )
  }
}

export default Header