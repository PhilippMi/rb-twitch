var express = require('express');
var router = express.Router();
const {addStream} = require('../repositories/golive');

router.post('/', function(req, res) {
    let stream = req.body.data[0];
    console.log('golive rec', req.body.data[0]);
    addStream(stream.user_id, stream.title);
    res.status(200).send('ok');
});

router.get('/', function(req, res) {
    res.send(req.query['hub.challenge']);
});

module.exports = router;