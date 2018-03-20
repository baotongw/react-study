import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, Status } from '../const'

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

function listReducer(action, state = defaultState) {
  switch (action.type) {
    case ADD_ITEM:
      const count = state.count++;
      const item = {
        id: count,
        val: action.payload,
        status: Status.Active,
      }

      return {
        count,
        list: state.list.concat([item]),
      }
      break
    case EDIT_ITEM:
    case DELETE_ITEM:
      const { id } = action.payload
      const { list } = state

      const [matchIndex, matchItem] = findMatchItem(id, list)
      
      list.splice(matchIndex, 1, {
        ...matchItem,
        ...action.payload,
      })
      
      return {
        ...state,
        list: oldList.slice(0),
      }
      break
  }

  return state
}

export default listReducer
