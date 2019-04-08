// 引入redux的api
const {
  createStore,
  combineReducers,
  applyMiddleware
} = require('./index');

// 引入redux中间价
const reduxPromise = require('./redux-promise');
const reduxThunk = require('./redux-thunk-es5');

// 常量定义
const ACTION_TYPES = {
  addAge: 'ADD_AGE',
  appendList: 'APPEND_LIST'
}

// Actions
// 年龄 +1
const addAge = () => {
  return { type: ACTION_TYPES.addAge }
}
// 增加一个列表项
const appendList = (item) => {
  return { type: ACTION_TYPES.appendList, payload: item }
}

// Default State
const defaultState1 = {
  name: 'baotong',
  age: 28,
}
// Reducers
function reducer_personal(state = defaultState1, action) {
  // console.log(action)
  switch (action.type) {
    case ACTION_TYPES.addAge:
      const newAge = state.age + 1;
      return Object.assign({}, state, { age: newAge })
      break;
  }

  return state;
}


const defaultState2 = [1, 2, 3];

function reducer_company(state = defaultState2, { type, payload = null }) {
  switch (type) {
    case ACTION_TYPES.appendList:
      if (!payload) {
        return state;
      }
      // 如果直接添加会有问题
      // state.push(payload);
      // return state;

      // 需要返回一个新的list
      const newList = state.slice(0)
      newList.push(payload);
      return newList;
      break;
  }

  return state;
}

// 创建定层reducer
const rootReducer = combineReducers({ reducer_personal, reducer_company });

// 配置中间价
const middlewares = applyMiddleware(reduxThunk, reduxPromise);

// 创建store
const store = createStore(rootReducer, middlewares);

// 从store中拿到dispatch，getState
const { dispatch, getState } = store;

// 打印初始state
console.log('Init State');
console.log(JSON.stringify(getState()));

// 模拟一个普通action
dispatch(addAge());
console.log('Sync Action');
console.log(JSON.stringify(getState()));

// 模拟一个异步action - dispatch的是一个function
// 这里用到了中间价
const asyncFunc = () => function (dispatch) {
  setTimeout(() => {
    dispatch(addAge());
    console.log('Async Action');
    console.log(JSON.stringify(getState()));
  }, 3000);
}
dispatch(asyncFunc())

// 验证针对一个数组类型，不同写法会不会认为有差异
const preState = getState();
dispatch(appendList(4));
const nextState = getState();
console.log('Is Match');
console.log(preState === nextState);
console.log('pre-state', JSON.stringify(preState));
console.log('new-state', JSON.stringify(nextState));