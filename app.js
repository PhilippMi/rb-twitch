var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
const WebSocket = require('ws');

var index = require('./routes/index');
const subscribers = require('./routes/subscribers');
const golive = require('./routes/golive');
const stream = require('./routes/stream');

const registerTwitchWebhooks = require('./startup/twitch-webhooks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.use('/', index);

app.use('/twitch/subscribers', subscribers);
app.use('/twitch/golive', golive);
app.use('/twitch/stream', stream);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const wss = new WebSocket.Server({port: 40510});

wss.on('connection', function connection(ws, req) {
    console.log('ws connection');
    setInterval(() => ws.send('something'), 5000);
});

registerTwitchWebhooks();

module.exports = app;
