import { ActionTypes } from './createStore'
import isPlainObject from 'lodash/isPlainObject'
import warning from './utils/warning'

// 获取state是undefined的错误提示消息
function getUndefinedStateErrorMessage(key, action) {
  const actionType = action && action.type
  // 如果action没有type，默认是一个‘an action’；有的话就是它的type
  const actionName = (actionType && `"${actionType.toString()}"`) || 'an action'

  // 拼出来一段默认的error message
  // 告知哪个reducer在哪个传入的action下返回了undefined
  return (
    `Given action ${actionName}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  )
}

// 获取预期之外的state类型 warning 消息
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  // 所有reducer的key
  const reducerKeys = Object.keys(reducers)
  // 传入了redux默认的action
  // 经过计算返回的和之前的state一样，没有任何改动，没有意义？
  const argumentName = action && action.type === ActionTypes.INIT ?
    'preloadedState argument passed to createStore' :
    'previous state received by the reducer'

  // 必须至少一个reducer
  if (reducerKeys.length === 0) {
    return (
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    )
  }

  // 输入的state不是一个简单对象｛｝，比如function，对象实例，promise这种高级类型都不允许
  if (!isPlainObject(inputState)) {
    return (
      `The ${argumentName} has unexpected type of "` +
      ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
      `". Expected argument to be an object with the following ` +
      `keys: "${reducerKeys.join('", "')}"`
    )
  }

  // state中的数据存在不是通过reducer生成的字段存在
  // unexpectedKeyCache：白名单，里面的key可是不是reducer生成的
  const unexpectedKeys = Object.keys(inputState).filter(key =>
    !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]
  )

  // 将上一步晒出来的不是reducer生成的key加入到一起之外的白名单里
  // 确保这里返回的错误学习只执行一次
  unexpectedKeys.forEach(key => {
    unexpectedKeyCache[key] = true
  })

  if (unexpectedKeys.length > 0) {
    return (
      `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
      `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
    )
  }
}

// 验证reducer是否符合要求
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(key => {
    const reducer = reducers[key]
    // preState传入undefined，确保返回值不是undefined
    const initialState = reducer(undefined, { type: ActionTypes.INIT })

    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
        `If the state passed to the reducer is undefined, you must ` +
        `explicitly return the initial state. The initial state may ` +
        `not be undefined. If you don't want to set a value for this reducer, ` +
        `you can use null instead of undefined.`
      )
    }

    // 传入一个随机的action也不能返回undefined
    // 有些故意写的无意义的action也要保证有正确的值返回
    const type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.')
    if (typeof reducer(undefined, { type }) === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
        `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
        `namespace. They are considered private. Instead, you must return the ` +
        `current state for any unknown actions, unless it is undefined, ` +
        `in which case you must return the initial state, regardless of the ` +
        `action type. The initial state may not be undefined, but can be null.`
      )
    }
  })
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
export default function combineReducers(reducers) {
  // 所有reducer中的key
  const reducerKeys = Object.keys(reducers)
  // 经过校验没问题的reducer合集
  const finalReducers = {}

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (process.env.NODE_ENV !== 'production') {
      // todo。。为什么会做这个判断
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }

    // 是function的都会通过
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }

  // 最终的reducer key集合
  const finalReducerKeys = Object.keys(finalReducers)

  let unexpectedKeyCache
  // todo。。针对node打包工具的处理？
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }

  let shapeAssertionError
  // 有一个验证失败就抛出error
  try {
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  // dispatch中传入完整的currentState和当前的action
  // 这个就是最终组合的单一reducer
  // 内部调用finalReducer来计算每一个子部分数据
  // 最终放到一个完整的对象输出作为新的state
  return function combination(state = {}, action) {
    // reducer有一个不满足要求的都会报错
    // init的时候就会报错
    if (shapeAssertionError) {
      throw shapeAssertionError
    }

    // todo。。针对node打包工具的判断
    // 编译期间验证哪些reducer不符合要求
    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache)
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    // 标记计算过后state有没有发生改变
    let hasChanged = false
    // 新的state
    const nextState = {}

    for (let i = 0; i < finalReducerKeys.length; i++) {
      // 子reducer对应的key
      const key = finalReducerKeys[i]
      // 子reducer，计算function
      const reducer = finalReducers[key]
      // 计算之前的状态
      const previousStateForKey = state[key]
      // 新的状态
      const nextStateForKey = reducer(previousStateForKey, action)
      // 任何state都不能返回undefined，有就报错
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      // 合并到最终输出中
      nextState[key] = nextStateForKey
      // shallow diff，如果引用不一样就认为发生了改变
      // 所以如果是一个数组发生了push、pop，对象增减、改变字段
      // 引用关系是不会变得，导致最终的state不变
      // 无法触发view的更新，所以需要做到每一个reducer再有变动的时候都返回新的array，object引用
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // 最终决定是返回新的state还是之前的
    // 这里是不是也应该告知是否发生了change呢？目前没有
    // dispatch也是直接把返回值作为当前值使用了
    // 比较依赖react中的this.props and nextProps
    return hasChanged ? nextState : state
  }
}
