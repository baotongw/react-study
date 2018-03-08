import React, { Component } from 'react'
import Status from './status'
import { updateItemAction, removeItemAction, selectItemAction } from '../actions/actions'

class ListItem extends Component {
    onItemCheck(event) {
        let {li} = this.props
        li.status = this.refs.chk.checked ? Status.Complete : Status.Active

        updateItemAction(li)
    }

    deleteItem(event) {
        removeItemAction(this.props.li.id)
    }

    changeItem(txt) {
        let {li} = this.props

        selectItemAction({
            updateId: li.id,
            updateVal: txt
        })
    }
    
    render() {
        let {li} = this.props
        let attr = false, cls = ''

        switch(li.status) {
            case Status.Active:
                break
            case Status.Complete:
                attr = true
                break
            case Status.Delete:
                attr = true
                cls = 'delete'
                break
        }

        return <li className={cls}>
            <span className="chk">
                <input type="checkbox" ref="chk" name="status" checked={attr} onChange={this.onItemCheck.bind(this)} />
            </span>
            <span className="val" onClick={this.changeItem.bind(this, li.val)}>{li.val}</span>
            <span className="oper">
                <a href="javascript:" className="del" onClick={this.deleteItem.bind(this)} >Delete</a>
            </span>
        </li>
    }
}

export default ListItem