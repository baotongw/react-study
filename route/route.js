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

router.get('/demo/react/:name', (req, res) => {
    let demoName = req.params.name;

    res.render(`pages/demos/react/${demoName}`)
})

module.exports = router;