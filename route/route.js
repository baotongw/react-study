const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/article/react', (req, res) => {
    res.render('pages/react');
});

router.get('/article/backbone', (req, res) => {
    res.render('pages/backbone');
});

module.exports = router;