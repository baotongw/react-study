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
    const { editItem } = nextProps
    const { editId, editVal } = editItem

    if (editId > 0 && editVal) {
      // this.setState({
      //   val: editVal,
      // })
      this.ipt.value = editVal
      this.ipt.focus()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { editItem } = nextProps
    const { editId, editVal } = editItem
    
    return editId !== nextProps.editItem.editId || editVal !== nextProps.editItem.editVal
    // return editId !== nextProps.editItem.editId || editVal !== nextProps.editItem.editVal || this.state.val !== nextState.val
  }

  componentDidUpdate() {
    console.log('header did update.')
  }

  componentDidMount() {
    console.log('baotongw header did Mount.')
    let index = 0;
    let arr = new Array(100);
    arr.fill(1);

    // let intervalId = setInterval(() => {
      for(let i=0;i<arr.length;i++) {
        index += 1;
        this.props.appendOrUpdateItem({
          index,
          isUpdate: false,
          editItem: {
            id: index,
            status: Status.Active,
            val: index,
          }
        });
      }
      
      

      // if(index === 100) {
      //   clearInterval(intervalId);
      // }
    // }, 0);
  }

  // obsolete
  onIptChange(e) {
    this.setState({
      val: e.target.value
    })
  }

  editDone(event) {
    if (event.keyCode !== 13) {
      return
    }

    let { editItem, appendOrUpdateItem } = this.props
    let { list, count, editId } = editItem
    let isUpdate = editId > 0
    let index = -1

    let item = isUpdate ? list.filter((li, i) => {
      if(li.id === editId) {
        index = i
        return li
      }

      return false
    })[0] : {
      id: ++count
    }

    const newItem = {
      id: item.id,
      // reset status
      status: Status.Active,
      // reset value
      val: this.ipt.value,
    }

    appendOrUpdateItem({
      index,
      isUpdate,
      editItem: newItem,
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