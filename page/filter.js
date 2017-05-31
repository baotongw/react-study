import React, { Component } from 'react'
import Status from './status'

class Filter extends Component {
    constructor() {
        super()

        this.state = {
            activeIndex: 0
        }
    }
    onItemClick(btn, index) {
        let {filter, updateState} = this.props

        if(btn === filter) {
            return
        }

        this.state.activeIndex = index

        updateState({
            filter: btn
        })
    }
    render() {
        let {activeIndex} = this.state
        let btns = []

        for(var filter in Status) {
            btns.push(Status[filter])
        }

        let doms = btns.map((btn, i) => {
            let cls = 'key' + (activeIndex === i ? ' active' : '')

            return <a key={i} filter={'filter-' + i} href="javascript:" onClick={this.onItemClick.bind(this, btn, i)} className={cls}>{btn}</a>
        })

        return <div className="querys">{doms}</div>
    }
}

export default Filter