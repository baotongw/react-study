import { SET_FILTER, Status } from '../constant'

const defaultState = {
  filter: Status.All
}

function filterReducer(state = defaultState, action) {
  if(action.type === SET_FILTER && state.filter !== action.payload) {
    return { filter: action.payload }
  }

  return state;
}

export default filterReducer