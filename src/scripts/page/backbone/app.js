const Backbone = require('backbone')

let log = function (v) {
    console.log(v)
}

log('example-1')
let model = new Backbone.Model()
model.set('name', 'hello')
log(model.get('name'))

log('example-2')
let model2 = new Backbone.Model({ name: 'baotong' })
let model3 = new Backbone.Model({ name: 'wang' })
let col = new Backbone.Collection()
col.add(model2)
col.add(model3)
log(JSON.stringify(col))

log('example-3')

var M = Backbone.Model.extend(
    // 第一个对象传递实例方法
    { aaa: function () { log('aaa') } },
    // 第二个对象传递静态方法
    { bbb: function () { log('bbb') } }
)  //这里的aaa就是实例方法，bbb方法就是静态方法。

var model4 = new M();
model4.aaa();
M.bbb();

log('example-4')

var EventModel = Backbone.Model.extend({
    defaults: {
        name: 'baotong.wang'
    },
    initialize: function() {
        this.on('change', () => console.log('event model change'))
    }
})

var eventModel = new EventModel()
eventModel.set('name', 'xuan.li')

