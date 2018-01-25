var express = require('express');
var router = express.Router();
const {getStream} = require('../repositories/stream');

router.post('/', function(req, res) {
    let stream = req.body.data;
    console.log("route response", req.body.data);
    getStream(44426109);
    res.status(200).send('ok');
});

router.get('/', function(req, res) {
    res.send(req.query['hub.challenge']);
});

module.exports = router;