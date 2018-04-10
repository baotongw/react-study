const { createStore, combineReducers, applyMiddleware } = require('./index');
const reduxPromise = require('./redux-promise');
const reduxThunk = require('./redux-thunk-es5');

// Actions
const addAge = () => {
  return { type: 'ADD_AGE' }
}
const appendList = () => { 
  return {type: 'APPEND_LIST' }
}

// Default State
const defaultState1 = {
  name: 'baotong',
  age: 28,
  job: 'fe-developer',
}

const defaultState2 = {
  plan: 'learn redux',
  list: [1,2,3],
}

// Reducers
function reducer1(state = defaultState1, action) {
  console.log(action)
  switch(action.type) {
    case 'ADD_AGE':
      const newAge = state.age + 1;
      return Object.assign({}, state, { age: newAge })
      break;
  }

  return state;
}

function reducer2(state = defaultState2, action) {
  switch(action.type) {
    case 'APPEND_LIST':
      const len = state.list.length;
      const newList = state.list.slice(0).push(len + 1);
      return Object.assign({}, state, { list: newList });
      break;
  }

  return state;
}

const rootReducer = combineReducers({ reducer1, reducer2 });

const middleware = applyMiddleware(reduxThunk, reduxPromise);

const store = createStore(rootReducer, middleware);
const { dispatch, getState } = store;

console.log(getState());

const asyncFunc = () => function(dispatch) {
  setTimeout(() => {
    dispatch(addAge());
    console.log(getState()); 
  }, 3000);
}

dispatch(asyncFunc())

// dispatch(appendList());
// console.log(getState());