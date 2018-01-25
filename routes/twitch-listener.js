var express = require('express');
var router = express.Router();
const {getCustomScript} = require('../repositories/twitch-listener');

router.post('/', function(req, res) {
    getCustomScript(req.body);
    res.status(200).send('ok');
});

router.get('/', function(req, res) {
    res.send(req.query['hub.challenge']);
});

module.exports = router;