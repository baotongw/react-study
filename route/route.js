const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home')
})

// react 学习、功能测试页
router.get('/react/:page', (req, res) => {
    let pageName = req.param.page
    res.render(`pages/react/${pageName}`)
})

// 不同tech实现的todolist
router.get('/todolist/:tech', (req, res) => {
    let tech = req.param.tech
    res.render(`pages/todolist/${tech}`)
})

// css功能feature学习页
router.get('/css/:page', (req, res) => {
    let pageName = req.params.page
    res.render(`pages/css/${pageName}`)
})

// 其他功能 - websocket demo
router.get('/other/:page', (req, res) => {
    let pageName = req.param.page
    res.render(`pages/other/${pageName}`)
})

module.exports = router