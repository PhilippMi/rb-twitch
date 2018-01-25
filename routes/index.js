var express = require('express');
var router = express.Router();
const {getSubscribers} = require('../repositories/subscribers');
const {getStreams} = require('../repositories/golive');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', subscribers: getSubscribers(), live: getStreams() });
});

module.exports = router;
