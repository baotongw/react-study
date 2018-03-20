import { SELECT_ITEM } from '../const'

const defaultState = {
  editId: -1,
  editVal: '',
}

function headerReducer(action ,state = defaultState) {
  if(action.type === SELECT_ITEM) {
    return { 
      ...state, 
      ...action.payload 
    }
  }

  return state;
}

export default headerReducer