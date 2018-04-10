// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

const CLEARED = null
const nullListeners = { notify() {} }

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  let current = []
  let next = []

  return {
    // 还原
    clear() {
      next = CLEARED
      current = CLEARED
    },
    // 通知
    notify() {
      // 执行回调的时候设置current = next
      const listeners = current = next
      for (let i = 0; i < listeners.length; i++) {
        // 执行回调
        listeners[i]()
      }
    },
    // 获取当前订阅list
    get() {
      return next
    },
    // 订阅，传入回调函数
    subscribe(listener) {
      let isSubscribed = true
      if (next === current) {
        // deep copy，用来区分current和next
        next = current.slice()
      }
      // 想next中添加
      next.push(listener)

      return function unsubscribe() {
        // 已经取消了或者订阅list为空，不执行任何动作；防止二次调用
        if (!isSubscribed || current === CLEARED) return
        isSubscribed = false
        // 取消订阅
        if (next === current) next = current.slice()
        next.splice(next.indexOf(listener), 1)
      }
    }
  }
}

export default class Subscription {
  constructor(store, parentSub, onStateChange) {
    this.store = store
    this.parentSub = parentSub
    this.onStateChange = onStateChange
    this.unsubscribe = null
    this.listeners = nullListeners
  }

  addNestedSub(listener) {
    this.trySubscribe()
    return this.listeners.subscribe(listener)
  }

  notifyNestedSubs() {
    this.listeners.notify()
  }

  isSubscribed() {
    return Boolean(this.unsubscribe)
  }

  trySubscribe() {
    // store的subscribe会在dispatch之后调用回调
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub
        ? this.parentSub.addNestedSub(this.onStateChange)
        : this.store.subscribe(this.onStateChange)
 
      this.listeners = createListenerCollection()
    }
  }

  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
      this.listeners.clear()
      this.listeners = nullListeners
    }
  }
}
