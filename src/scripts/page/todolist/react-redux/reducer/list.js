import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, Status } from '../constant'

// {
//   id: 1
//   val: 'test'
//   status: 'Active'
// }
const defaultState = {
  count: 0,
  list: [],
}

function findMatchItem(id, list) {
  let matchIndex = -1
  let matchItem = null

  list.forEach((item, i) => {
    if (item.id === id) {
      matchItem = item
      matchIndex = i
      return false
    }
  })

  return [matchIndex, matchItem]
}

function listReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_ITEM:
      const item = {
        id: state.count++,
        val: action.payload,
        status: Status.Active,
      }

      return {
        count: state.count,
        list: state.list.concat([item]),
      }
      
      break
    case EDIT_ITEM:
    case DELETE_ITEM:
      const { id } = action.payload
      const { list } = state
      const [matchIndex, matchItem] = findMatchItem(id, list)
      
      const newItem = {
        ...matchItem,
        ...action.payload,
      }
      
      if(action.type === DELETE_ITEM) {
        newItem.status = Status.Delete
      }

      list.splice(matchIndex, 1, newItem)
      
      return {
        ...state,
        list: list.slice(0),
      }
      break
  }

  return state
}

export default listReducer
