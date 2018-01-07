import React, { Component } from 'react'
import Status from './status.js'

class Header extends Component {
    componentWillReceiveProps(nextProps) {
        let {states} = nextProps
        let {updateId, updateVal} = states

        if(updateId > 0 && updateVal) {
            this.refs.ipt.value = updateVal
            this.refs.ipt.focus();
        }
    }

    appendList(event) {
        if(event.keyCode !== 13) {
            return
        }

        let {states, updateState} = this.props
        let {list, count, updateId} = states
        let isUpdate = updateId > 0;
        let item = isUpdate ? list.filter(li => li.id === updateId)[0] : {
            id: ++count
        }

        // reset status
        item.status = Status.Active
        // reset value
        item.val = this.refs.ipt.value

        isUpdate || list.push(item)

        updateState({
            count: item.id,
            list,
            updateId: -1,
            updateVal: ''
        })

        this.refs.ipt.value = ''
    }

    render() {
        return <div className="header">
            <input ref="ipt" type="text" className="ipt" onKeyUp={this.appendList.bind(this)} />
        </div>
    }
}

export default Header