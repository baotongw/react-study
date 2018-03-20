import { SET_FILTER, Status } from '../const'

const defaultState = {
  filter: Status.All
}

function filterReducer(action ,state = defaultState) {
  if(action.type === SET_FILTER && state.filter !== action.payloadß) {
    return { filter: action.payload }
  }

  return state;
}

export default filterReducer