var express = require('express');
var router = express.Router();
const {getStream} = require('../repositories/stream');

router.get('/', function(req, res) {
    getStream(44426109).then(data => res.send(data));
});

module.exports = router;