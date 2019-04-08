import { createStore, combineReducers, applyMiddleware } from 'redux'

import listReducer from './list'
import header from './header'
import filterReducer from './filter'

import reduxLoggerMiddleware from '../middleware/logger';

const rootReducer = combineReducers({
  listReducer,
  header,
  filterReducer,
})

const middlewares = applyMiddleware(reduxLoggerMiddleware)

const store = createStore(rootReducer, middlewares)

const { dispatch, subscribe, getState } = store

export {
  dispatch,
}

export default store