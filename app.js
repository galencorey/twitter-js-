var express = require( 'express' );
var chalk = require('chalk');
var swig = require('swig');
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
  var locals = {
    title: 'An Example',
    people : [
    {name: 'Gandalf'},
    {name: 'Frodo'},
    {name: 'Hermione'}
    ]
  };
  res.render(swig.renderFile('./views/index.html', locals, function(err, output){
    if(err) throw err;
    console.log(output);
  }));
});

