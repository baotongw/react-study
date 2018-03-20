import { createStore, combineReducers } from 'redux'

import list from './list'
import header from './header'
import filter from './filter'

const rootReducer = combineReducers({
  list,
  header,
  filter,
})

const store = createStore(rootReducer)

const { dispatch, subscribe, getState } = store

export {
  dispatch,
}

export default store