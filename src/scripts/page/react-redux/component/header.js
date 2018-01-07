import React, { Component } from 'react'
import Status from './status.js'

import { addItemAction, updateItemAction } from '../actions/actions'

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

        let {states} = this.props
        let {list, updateId} = states
        let isUpdate = updateId > 0
        let text = this.refs.ipt.value

        if(!text) {
            return
        }

        if(isUpdate) {
            let item = {
                id: updateId,
                status: Status.Active,
                val: text
            }
            
            updateItemAction(item)
        } else {
            addItemAction(text)
        }

        this.refs.ipt.value = ''
    }

    render() {
        return <div className="header">
            <input ref="ipt" type="text" className="ipt" onKeyUp={this.appendList.bind(this)} />
        </div>
    }
}

export default Header