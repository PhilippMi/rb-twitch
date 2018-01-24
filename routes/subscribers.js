var express = require('express');
var router = express.Router();
const {addSubscribers} = require('../repositories/subscribers');

router.post('/', function(req, res) {
    addSubscribers(JSON.parse(req.body).from_id);
    res.status(200).send('ok');
});

router.get('/', function(req, res) {
    res.send(req.query['hub.challenge']);
});

module.exports = router;