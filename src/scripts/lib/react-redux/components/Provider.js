import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { storeShape, subscriptionShape } from '../utils/PropTypes'
import warning from '../utils/warning'

let didWarnAboutReceivingStore = false
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return
  }
  didWarnAboutReceivingStore = true

  warning(
    '<Provider> does not support changing `store` on the fly. ' +
    'It is most likely that you see this error because you updated to ' +
    'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' +
    'automatically. See https://github.com/reactjs/react-redux/releases/' +
    'tag/v2.0.0 for the migration instructions.'
  )
}

export function createProvider(storeKey = 'store', subKey) {
  const subscriptionKey = subKey || `${storeKey}Subscription`

  class Provider extends Component {
    getChildContext() {
      return { [storeKey]: this[storeKey], [subscriptionKey]: null }
    }

    constructor(props, context) {
      super(props, context)
      // 这里存储了全局store
      // this.store = props.store;
      this[storeKey] = props.store;
    }

    render() {
      // 保证内层容器的唯一性，就当Provider不存在
      return Children.only(this.props.children);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      // store是唯一的，改变的是内部的reducer？只有一个reducer的时候呢？
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore()
      }
    }
  }

  Provider.propTypes = {
    // props的属性只能叫store 必传；内部缓存的storeKey可以自定义，其实也是store
    store: storeShape.isRequired,
    // 必须有children
    children: PropTypes.element.isRequired,
  }
  Provider.childContextTypes = {
    [storeKey]: storeShape.isRequired,
    [subscriptionKey]: subscriptionShape,
  }

  return Provider
}

export default createProvider()
