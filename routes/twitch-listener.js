var express = require('express');
var router = express.Router();
const {twitchListenerCS} = require('../scripts/twitch-listener');

router.post('/', function(req, res) {
    twitchListenerCS(req.body.data);
    res.status(200).send('ok');
});

module.exports = router;