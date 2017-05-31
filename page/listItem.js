import React, { Component } from 'react'
import Status from './status'

class ListItem extends Component {
    onItemCheck(event) {
        let {li, updateItem} = this.props

        if(this.refs.chk.checked) {
            li.status = Status.Complete
        } else {
            li.status = Status.Active
        }

        updateItem(li)
    }

    deleteItem(event) {
        let {li, updateItem} = this.props

        li.status = Status.Delete
        updateItem(li)
    }

    changeItem(txt) {
        let {li, selectItem} = this.props

        selectItem({
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