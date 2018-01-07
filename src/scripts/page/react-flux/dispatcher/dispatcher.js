import {Dispatcher} from 'flux'
import Store from '../store/store'
import {ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, SELECT_ITEM, SET_FILTER} from '../const/const'

const AppDispatcher = new Dispatcher()

AppDispatcher.register(action => {
    let ret = true

    switch(action.actionType) {
        case ADD_ITEM: 
            Store.addHandler(action.text)
            break
        case REMOVE_ITEM: 
            Store.removeHandler(action.id)
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

export default AppDispatcher