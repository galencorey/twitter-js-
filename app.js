var express = require( 'express' );
var chalk = require('chalk');
var app = express();

app.listen(3000, function(){console.log("hi")});

app.use('/',function(req, res){
  var method = req.method;
  var route = req.originalUrl;

  console.log(method, route);
});

app.get('/',function(req, res){
  res.send("Welcome!");
});

