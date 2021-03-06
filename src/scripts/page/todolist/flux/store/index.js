import EventEmitter from 'events'
import Status from '../component/status'

class Store extends EventEmitter {
  constructor() {
    super()

    this.state = {
      editId: -1,
      editVal: null,
      list: [],
      filter: Status.All,
    }    
  }

  getState() {
    return this.state
  }

  registeChangeHandler(cb) {
    this.on('change', cb)

    // const wrapperCallback = () => {
    //   cb(this.state);
    // }

    // this.on('change', wrapperCallback);

    // return function unsubscribe() {
    //   this.removeChangeHandler('change', wrapperCallback);
    // }
  }

  removeChangeHandler(cb) {
    this.removeChangeHandler('change', cb)
  }

  emitChange() {
    this.emit('change')
  }

  addHandler(text) {
    const { list } = this.state
    let len = list.length

    list.push({
      id: len + 1,
      val: text,
      status: Status.Active
    })
  }

  updateHandler(item) {
    const { list } = this.state
    let index = -1

    list.forEach((v, i) => {
      if (v.id === item.id) {
        index = i
      }
    })

    if(index > -1) {
      list.splice(index, 1, item)
      this.state.editId = -1
      this.state.editVal = null
    }
  }

  deleteHandler(id, text) {
    const { list } = this.state
    let index = -1

    list.forEach((v, i) => {
      if (v.id === id) {
        index = i
      }
    })

    if(index > -1) {
      const item = Object.assign({}, list[index])
      item.status = Status.Delete
      list.splice(index, 1, item)
    }
  }

  selectHandler(item) {
    this.state.editId = item.editId
    this.state.editVal = item.editVal
  }

  filterHandler (filter) {
    this.state.filter = filter
  }
}

export default new Store()

// const Store = Object.assign({}, EventEmitter.prototype, {
//   editId: -1,
//   editVal: null,
//   list: [],
//   filter: Status.All,

//   getAll: function () {
//     return {
//       editId: this.editId,
//       editVal: this.editVal,
//       list: this.list,
//       filter: this.filter
//     }
//   },

//   registeChangeHandler: function (callback) {
//     this.on('change', callback)
//   },

//   removeChangeHandler: function (callback) {
//     this.removeListener('change', callback)
//   },

//   emitChange: function () {
//     this.emit('change')
//   },

//   addHandler: function (text) {
//     let len = this.list.length

//     this.list.push({
//       id: len + 1,
//       val: text,
//       status: Status.Active
//     })
//   },

//   updateHandler: function (item) {
//     let self = this;

//     this.list.forEach(v => {
//       if (v.id === item.id) {
//         v.val = item.val

//         this.editId = -1
//         this.editVal = null
//       }
//     })
//   },

//   deleteHandler: function (id, text) {
//     let flagIndex = null

//     this.list.forEach((v, i) => {
//       if (v.id === id) {
//         v.status = Status.Delete
//       }
//     })
//   },

//   selectHandler: function (item) {
//     this.editId = item.editId
//     this.editVal = item.editVal
//   },

//   filterHandler: function (filter) {
//     this.filter = filter
//   }
// })

// export default Store