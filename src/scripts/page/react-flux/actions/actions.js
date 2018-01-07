import dispatcher from '../dispatcher/dispatcher'
import {ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, SELECT_ITEM, SET_FILTER} from '../const/const'

// 和redux明显不同的是，这里不是返回一个纯对象，而是执行了一个function
// 通过调用dispatch方法来发出一个action

export const addItemAction = (text) => {
    dispatcher.dispatch({
        actionType: ADD_ITEM,
        text
    })
}

export const removeItemAction = id => {
    dispatcher.dispatch({
        actionType: REMOVE_ITEM,
        id
    })
}

export const updateItemAction = item => {
    dispatcher.dispatch({
        actionType: UPDATE_ITEM,
        item
    })
}

export const selectItemAction = item => {
    dispatcher.dispatch({
        actionType: SELECT_ITEM,
        item
    })
}

export const setFilterAction = filter => {
    dispatcher.dispatch({
        actionType: SET_FILTER,
        filter
    })
}