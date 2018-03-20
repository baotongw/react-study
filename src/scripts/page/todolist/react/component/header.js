import React, { Component } from 'react'
import Status from './status.js'

class Header extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   val: '',
    // }

    // this.onIptChange = this.onIptChange.bind(this)
    this.editDone = this.editDone.bind(this)
  }
  

  componentWillReceiveProps(nextProps) {
    const { current } = nextProps
    const { updateId, updateVal } = current

    if (updateId > 0 && updateVal) {
      // this.setState({
      //   val: updateVal,
      // })
      this.ipt.value = updateVal
      this.ipt.focus()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { current } = nextProps
    const { updateId, updateVal } = current
    
    return updateId !== nextProps.current.updateId || updateVal !== nextProps.current.updateVal
    // return updateId !== nextProps.current.updateId || updateVal !== nextProps.current.updateVal || this.state.val !== nextState.val
  }

  componentDidUpdate() {
    console.log('header did update.')
  }

  componentDidMount() {
    console.log('header did Mount.')
  }

  onIptChange(e) {
    this.setState({
      val: e.target.value
    })
  }

  editDone(event) {
    if (event.keyCode !== 13) {
      return
    }

    let { current, appendOrUpdateItem } = this.props
    let { list, count, updateId } = current
    let isUpdate = updateId > 0
    let index = -1

    let item = isUpdate ? list.filter((li, i) => {
      if(li.id === updateId) {
        index = i
        return li
      }

      return false
    })[0] : {
      id: ++count
    }

    const editItem = {
      id: item.id,
      // reset status
      status: Status.Active,
      // reset value
      val: this.ipt.value,
    }

    appendOrUpdateItem({
      index,
      isUpdate,
      editItem,
    })

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

    // const { val } = this.state    

    // return <div className="header">
    //   <input type="text" className="ipt" 
    //     value={val}
    //     ref ={ipt => this.ipt = ipt}
    //     onChange={this.onIptChange}
    //     onKeyUp={this.editDone} />
    // </div>
  }
}

export default Header