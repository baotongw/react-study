import { createStore, combineReducers } from 'redux'

import listReducer from './list'
import header from './header'
import filterReducer from './filter'

const rootReducer = combineReducers({
  listReducer,
  header,
  filterReducer,
})

const store = createStore(rootReducer)

const { dispatch, subscribe, getState } = store

export {
  dispatch,
}

export default store