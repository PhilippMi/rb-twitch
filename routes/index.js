var express = require('express');
var router = express.Router();
const {getSubscribers} = require('../repositories/subscribers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', subscribers: getSubscribers() });
});

module.exports = router;
