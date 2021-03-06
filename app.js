var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://localhost/mern-crud', { useMongoClient: true, promiseLibrary: require('bluebird') })
// 'mongodb://localhost/mern-crud'
// 'mongodb+srv://admin-jacky:test123@cluster0.irbse.mongodb.net/libraryDB?retryWrites=true&w=majority'
mongoose.connect("mongodb://admin-jacky:test123@cluster0-shard-00-00.irbse.mongodb.net:27017,cluster0-shard-00-01.irbse.mongodb.net:27017,cluster0-shard-00-02.irbse.mongodb.net:27017/libraryDB?ssl=true&replicaSet=atlas-5m3ql7-shard-0&authSource=admin&retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/* .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err)); */

var book = require('./routes/book');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/book', book);

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

module.exports = app;
