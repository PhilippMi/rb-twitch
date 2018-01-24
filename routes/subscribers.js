var express = require('express');
var router = express.Router();
const {addSubscribers} = require('../repositories/subscribers');

/* GET home page. */
router.post('/', function(req, res) {
    addSubscribers(req.body);
    res.status(200).send('ok');
});

module.exports = router;