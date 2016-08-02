var express = require( 'express' );
var chalk = require('chalk');
var app = express();

app.listen(3000, function(){console.log("hi")});

app.use('/',function(req, res, next){
  var method = chalk.blue(req.method);
  var route = chalk.red(req.originalUrl);

  console.log(method, route);
  next();
});

app.use('/special', function(req, res, next){
  console.log('you reached the special area');
});

app.get('/',function(req, res){
  res.send("Welcome!");
});

