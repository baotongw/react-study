import { observable } from 'mobx'

const store = observable({
  editId: -1,
  editVal: '',
  count: 0,
  filter: Status.All,
  list: [],
})

export default store