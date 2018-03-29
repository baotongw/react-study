import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 * 
 * 所有的middleware都是为了增强dispatch，dispatch是整个flux系统类库的核心
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 * 
 * 异步middleware应该放到enhancer的第一位
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  // 这里返回的是一个enhancer函数
  // 内层函数由enhancer返回的function直接调用
  // 穿入参数只有两个：reducer，preloadedState
  return (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }

    // chain是结合了middlewareAPI之后的包装function数组合集
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 增强版的dispatch
    // applyMiddleware只做了dispatch扩展，使用middleware依次增强
    dispatch = compose(...chain)(store.dispatch)

    // 这里返回原始store的export
    return {
      ...store,
      dispatch
    }
  }
}
