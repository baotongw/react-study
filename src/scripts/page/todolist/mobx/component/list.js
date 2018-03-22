import React, { Component } from 'react'
import { observer } from 'mobx-react';
import Status from './status'
import ListItem from './listItem'
import store from '../store/index'

@observer
class List extends Component {

  componentDidUpdate() {
    console.log('list did update.')
  }

  componentDidMount() {
    console.log('list did Mount.')
  }

  render() {
    let { list = [], filter } = store
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