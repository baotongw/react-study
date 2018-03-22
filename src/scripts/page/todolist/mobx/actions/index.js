import { action } from 'mobx'
import { Status } from '../component/status'
import store from '../store/index'

const Actions = {
  addItem: action(val => {
    const item = {
      id: ++store.count,
      val,
      status: Status.Active
    }
    
    store.list.push(item)
  }),
  updateItem: action(item => {
    const { id, val, status } = item

    store.list.forEach(v => {
      if(v.id === id) {
        v.val = val
        v.status = status

        return false
      }
    })
  }),
  deleteItem: action(item => {
    const { id } = item

    store.list.forEach(v => {
      if(v.id === id) {
        v.status = Status.Delete

        return false
      }
    })
  }),
  selectItem: action(editItem => {
    store.editId = editItem.editId
    store.editVal = editItem.editVal
  }),
  setFilter: action(filter => {
    store.filter = filter
  })
}

export default Actions
