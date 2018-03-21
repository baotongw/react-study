import React, { Component } from 'react'
import { connect } from 'react-redux'
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

    return (
      <div className="list">
        <ul className="i-list">{doms}</ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { listReducer, filterReducer } = state

  return { 
    list: listReducer.list,
    filter: filterReducer.filter,  
  }
} 

const wrapper = connect(mapStateToProps)(List)

export default wrapper
