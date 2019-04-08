/* 
 * waitfor:在执行制定条件前确保前置store已经处理过；即便已经处理过也会再次执行
 * 只要不是pending都会被执行
 * 
 * flux只是通过dispatcher约定了action -- store的格式和方法，
 * 通过这一步骤约定了一种开发模式
 * aciton的格式是固定的；至于怎么创建store，怎么做事件变动通知
 * 怎么从store拿数据，都没有定义，可以根据喜好来实现
 * 对比redux则是提供了subscribe、unsubscribe方法来指定
*/

import { Dispatcher } from 'flux'
import Store from '../store/index'

import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, SELECT_ITEM, SET_FILTER } from '../const/const'

const appDispatcher = new Dispatcher()

appDispatcher.register(action => {
  let ret = true

  switch (action.actionType) {
    case ADD_ITEM:
      Store.addHandler(action.text)
      break
    case DELETE_ITEM:
      Store.deleteHandler(action.id)
      break
    case UPDATE_ITEM:
      Store.updateHandler(action.item)
      break
    case SELECT_ITEM:
      Store.selectHandler(action.item)
      break
    case SET_FILTER:
      Store.filterHandler(action.filter)
      break
    default:
      ret = false
      break
  }

  ret && Store.emitChange()
})

export default appDispatcher