var express = require('express');
var router = express.Router();
const {showTwitch} = require('../scripts/twitch-listener');

router.post('/', function(req, res) {
    const script = showTwitch(req.body.data.from_id);
    res.status(200).send(script);
});

module.exports = router;
