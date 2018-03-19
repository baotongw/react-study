import React, { Component } from 'react'
import Status from './status'
import { setFilterAction } from '../actions/actions'

class Filter extends Component {
    constructor() {
        super()
    }
    
    onItemClick(btn, index) {
        let {filter, updateState} = this.props

        if(btn === filter) {
            return
        }

        setFilterAction(btn)
    }
    render() {
        let {filter} = this.props
        let btns = []

        for(let key in Status) {
            btns.push(Status[key])
        }

        let doms = btns.map((btn, i) => {
            let cls = 'key' + (filter === btn ? ' active' : '')

            return <a key={i} filter={'filter-' + i} href="javascript:" onClick={this.onItemClick.bind(this, btn, i)} className={cls}>{btn}</a>
        })

        return <div className="querys">{doms}</div>
    }
}

export default Filter