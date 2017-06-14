const express = require('express')
const {engineName, viewEngine} = require('./utils/handlebar')
const route = require('./route/route')

const site = new express()
// 设置使用handlebars作为视图引擎
site.engine(engineName, viewEngine)
site.set('view engine', engineName)
// 设置静态文件
site.use(express.static(__dirname + '/public'))
site.use('/', route)

const port = '9001'
site.listen(port)

console.log(`Site running at http://localhost:${port}`)
console.log('Press Ctrl + C to stop the service.')