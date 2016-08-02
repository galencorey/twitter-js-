var express = require( 'express' );
var chalk = require('chalk');
var swig = require('swig');
var app = express();

app.set('views', __dirname + '/views'); // point res.render to the proper directory
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', swig.renderFile); // when giving html files to res.render, tell it to use swig
swig.setDefaults({ cache: false });

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
  res.render(__dirname + '/views/index.html', locals, function(err, output){
    if(err) throw err;
    res.send(output);
  });
});

