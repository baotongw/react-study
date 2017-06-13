const express = require('express');
const site = new express();

// site.use()

site.get('/', (req, res) => {
    res.send('Express');
})

site.listen('9001');