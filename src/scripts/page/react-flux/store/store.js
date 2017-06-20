import EventEmitter from 'events'
import assign from 'object-assign'
import Status from '../component/status'

const Store = assign({}, EventEmitter.prototype, {
    updateId: -1,
    updateVal: null,
    list: [],
    filter: Status.All,

    getAll: function() {
        return { 
            updateId: this.updateId,
            updateVal: this.updateVal,
            list: this.list, 
            filter: this.filter
        }
    },

    addChangeHandler: function(callback) {
        this.on('change', callback)
    },

    emitChange: function() {
        this.emit('change')
    },

    addHandler: function(text) {
        let len = this.list.length
        
        this.list.push({
            id: len + 1,
            val: text,
            status: Status.Active
        })
    },

    updateHandler: function(item) {
        let self = this;

        this.list.forEach(v => {
            if(v.id === item.id) {
                v.val = item.val

                this.updateId = -1
                this.updateVal = null
            }
        })
    },

    removeHandler: function(id, text) {
        let flagIndex = null

        this.list.forEach((v, i) => {
            if(v.id === id) {
                v.status = Status.Delete
            }
        })
    },

    selectHandler: function(item) {
        this.updateId = item.updateId
        this.updateVal = item.updateVal
    },

    filterHandler: function(filter) {
        this.filter = filter
    },

    removeChangeHandler: function(callback) {
        this.removeListener('change', callback)
    }
})

export default Store