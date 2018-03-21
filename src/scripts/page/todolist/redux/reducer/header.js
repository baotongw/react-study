import { SELECT_ITEM } from '../constant'

const defaultState = {
  editId: -1,
  editVal: '',
}

function headerReducer(state = defaultState, action) {
  if(action.type === SELECT_ITEM) {
    return { 
      ...state, 
      ...action.payload 
    }
  }

  return state;
}

export default headerReducer