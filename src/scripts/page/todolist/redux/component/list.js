import React, { Component } from 'react'
import Status from './status'
import ListItem from './listItem'

class List extends Component {
  
  componentDidUpdate() {
    console.log('list did update.')
  }

  componentDidMount() {
    console.log('list did Mount.')
  }

  render() {
    let { list = [], filter } = this.props
    let checkKey = filter !== Status.All

    let doms = list.map(li => {
      // only show the filter matched item
      if (checkKey && li.status !== filter) {
        return ''
      }

      return <ListItem key={li.id} filter={'list-' + li.id} li={li} />
    })

    return <div className="list">
      <ul className="i-list">{doms}</ul>
    </div>
  }
}

export default List