const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/react', (req, res) => {
    res.render('pages/react-study')
})

router.get('/article/react', (req, res) => {
    res.render('pages/react');
})

router.get('/article/flux', (req, res) => {
    res.render('pages/react-flux');
})

router.get('/article/backbone', (req, res) => {
    res.render('pages/backbone');
})

router.get('/article/rtest', (req, res) => {
    res.render('pages/rtest');
})

router.get('/demo/react/:name', (req, res) => {
    let demoName = req.params.name;

    res.render(`pages/demos/react/${demoName}`)
})

router.get('/css/:name', (req, res) => {
    let pageName = req.params.name;
    res.render(`pages/css/${pageName}`);
})

router.get('/ws', (req, res) => {
    res.render(`pages/websocket`)
})

router.get('/css/:name', (req, res) => {
    let pageName = req.params.name;
    res.render(`pages/css/${pageName}`);
})

module.exports = router;