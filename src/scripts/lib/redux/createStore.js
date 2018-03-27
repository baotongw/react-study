import isPlainObject from 'lodash/isPlainObject'
import $$observable from 'symbol-observable'

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
export const ActionTypes = {
  INIT: '@@redux/INIT'
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
export default function createStore(reducer, preloadedState, enhancer) {
  // 处理第二个参数是enhancer的case（比如applyMiddleware）
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    // enhancer一定是一个function
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    // 通过enhancer来包装createStore
    // 这里的传入参数是createStore自身，在enhancer可以做一些额外事情，
    // 比如保存一些数据之后再调用createStore创建store
    // reducer、preloadState是原始调用createStore时传入的数据
    // 这里就是高阶函数的使用场景
    return enhancer(createStore)(reducer, preloadedState)
  }

  // reducer必须是一个function，注意是一个
  // 多个也会通过combineReducer组合成一个
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  // 原始reducer定义
  let currentReducer = reducer
  // 当前store维护的state tree，默认是原始传入的state，可以是空
  let currentState = preloadedState
  // 当前的listener
  let currentListeners = []
  // next listener
  let nextListeners = currentListeners
  // 是否正在dispatch
  let isDispatching = false

  // 确保可以修改下一个listener
  function ensureCanMutateNextListeners() {
    // 引用相等，是一个数组的情况，slice得到新的deep copy数组
    // 从而可以修改nextListeners而不会影响到currentListeners
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * Reads the state tree managed by the store.
   * 获取当前store中的完整数据
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 如果在change回调中再次调用dispatch，有如下警告
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   * 初步理解：dispatch是一个同步过程，每次dispatch执行开始的时候，回调列表已经是固定的
   * 了，在此期间新的订阅、或者取消了订阅，都不会对本次dispatch造成影响。但是当下一次调用
   * dispatch的时候，则会重新获取一下订阅回调列表，这时候新添加的、已经删除的都会受影响
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed（保证） that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   * 
   * listener可能不会看到所有的state变化，因为dispatch是同步的，内嵌再调用dispatch会等到
   * 嵌入的dispatch执行完之后在执行外层dispatch，导致最开始的state变化丢失；listener最终
   * 拿到的state是经过多次dispatch修改之后的数据
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    // listener必须是一个function
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }
    
    // 每个新添加的function都配有这个字段
    // 通过闭包传递到外部的unsubscribe中，用来保证接触订阅的唯一性
    let isSubscribed = true

    // 这里向nextListener加入新的listener，这时候和currentListener区分开了
    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    // 返回一个从当前订阅list中删除自身的function
    return function unsubscribe() {
      // 防止外部多次调用unsubscribe带来的问题
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      // 在nextListener中解除，这个时候没有同步到currentListener中
      ensureCanMutateNextListeners()
      // 找到这个listener，从回调队列中删除
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   * 只能通过dispatch一个action来更新state
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    // action一定是一个简单对象
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }

    // action必须有一个type字段，标识action类型
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }

    // 如果正在dispatch，抛出错误：不同同时触发多个action
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      // 将当前state和action传给reducer，计算得到新的state 
      // reducer一定是一个同步过程
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    // 每一次执行dispatch，得到最新的state之后
    // 通过currentListeners到最新的listeners
    // 添加完没有新的state产生之前，同步listener也没有意义
    const listeners = currentListeners = nextListeners
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      // 挨个执行注册的回调，注意这里并没有传入当前的state
      // 如果传入了是不是能省点事，反正也是要调用一次getState那数据的呀
      // 有可能只需要知道变动了，但是不需要数据，那传一次也没啥问题，多一次引用传递而已
      listener()
    }

    // 将传入的action原封不动返回
    return action
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   * 
   * 这个api可以动态替换当前的reducer，适用于动态加载的代码，或者基于此实现hot reload
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    // 替换当前的reducer，同时重新执行一次redux默认初始化，
    // 生成最新的基于新reducer的state
    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }

  /**
   * Interoperability point （规定了基于协同操作的） for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.')
        }

        // 遵循最简单observable模式的数据传递方式，必须有一个next方法
        // 每次有state变化的时候，调用订阅者的next方法，拿到最新的state
        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      }
    }
  }

  // 这里触发默认init action的目的是为了生成一次初始的state tree
  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
