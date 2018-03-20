import React, { Component } from 'react'
import Status from './status.js'
import Actions from '../actions/actions'
import Store from '../store/index'

class Header extends Component {

  constructor(props) {
    super(props)

    const { updateId, updateVal } = Store.getState()

    this.state = { updateId, updateVal }

    this.editDone = this.editDone.bind(this)
  }

  componentDidMount() {
    Store.registeChangeHandler(this.onChange)
  }

  componentWillUnmount() {
    Store.removeChangeHandler(this.onChange)
  }

  componentDidUpdate() {
    let { updateId, updateVal } = this.state

    if (updateId > 0 && updateVal) {
      this.ipt.value = updateVal
      this.ipt.focus()
    }
  }

  onChange = () => {
    const { updateId, updateVal } = Store.getState()

    // 有了这个就不怎么需要shouldComponentUpdate了
    if(this.state.updateId !== updateId || this.state.updateVal !== updateVal) {
      this.setState({
        updateId,
        updateVal,
      })
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { updateId, updateVal } = this.state
    
  //   return updateId !== nextState.states.updateId || updateVal !== nextProps.states.updateVal
  // }

  editDone(event) {
    if (event.keyCode !== 13) {
      return
    }

    let { list, updateId } = this.state
    let isUpdate = updateId > 0
    let text = this.ipt.value

    if (!text) {
      return
    }

    if (isUpdate) {
      let item = {
        id: updateId,
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