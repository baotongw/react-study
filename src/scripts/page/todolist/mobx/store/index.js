import { observable } from 'mobx'
import Status from '../component/status'

const store = observable({
  editId: -1,
  editVal: '',
  count: 0,
  filter: Status.All,
  list: [],
})

export default store