import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, SELECT_ITEM, SET_FILTER  } from '../const'

function actionCreator(type, payload) {
  if(!type) {
    return null
  }

  return { type, payload }
}

function addItem(text) {
  return actionCreator(ADD_ITEM, text)
}

function editItem(item) {
  return actionCreator(EDIT_ITEM, item)
}

function deleteItem(id) {
  return actionCreator(DELETE_ITEM, id)
}

function selectItem(id, isSelected) {
  return actionCreator(id, isSelected)
}

function setFilter(filter) {
  return actionCreator(filter)
}

export default {
  addItem, 
  editItem,
  deleteItem,
  selectItem,
  setFilter,
}