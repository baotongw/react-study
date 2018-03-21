import { createStore, combineReducers } from 'redux'

import listReducer from './list'
import headerReducer from './header'
import filterReducer from './filter'

const rootReducer = combineReducers({
  listReducer,
  headerReducer,
  filterReducer,
})

const store = createStore(rootReducer)

// const { dispatch, subscribe, getState } = store

export default store
