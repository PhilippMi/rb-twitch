var express = require('express');
var router = express.Router();
const {showTwitch} = require('../repositories/twitch-listener');

router.get('/', function(req, res, next) {
    res.render('twitchlistener', { title: 'Twitch', subscribers: showTwitch });
});

module.exports = router;
