import React, { Component } from 'react'
import Status from './status'
import ListItem from './listItem'

class List extends Component {
    updateItem(item) {
        let {list= [], updateState} = this.props

        list.forEach(li => {
            if(li.id === item.id) {
                li = item
            }
        })

        updateState({
            list
        })
    }

    selectItem(args) {
        this.props.updateState(args)
    }

    render() {
        let {list = [], filter} = this.props
        let checkKey = filter !== Status.All

        let doms = list.map(li => {
            // only show the filter matched item
            if(checkKey && li.status !== filter) {
                return ''
            }
            console.log(li.id);
            return <ListItem key={li.id} filter={'list-' + li.id} li={li} selectItem={this.selectItem.bind(this)} updateItem={this.updateItem.bind(this)} />
        })

        return <div className="list">
            <ul className="i-list">{doms}</ul>
        </div>
    }
}

export default List