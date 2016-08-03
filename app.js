var express = require( 'express' );
var chalk = require('chalk');
var swig = require('swig');
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

app.set('views', __dirname + '/views'); // point res.render to the proper directory
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', swig.renderFile); // when giving html files to res.render, tell it to use swig
swig.setDefaults({ cache: false });

var server = app.listen(3000, function(){
  console.log('Listening on port 3000...')
});

var io = socketio.listen(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/', function(req, res, next){
  var method = chalk.blue(req.method);
  var route = chalk.red(req.originalUrl);
  console.log(method, route);
  next();
});

app.use('/', routes(io));


// app.get('/',function(req, res){
//   var locals = {
//     title: 'An Example',
//     people : [
//     {name: 'Gandalf'},
//     {name: 'Frodo'},
//     {name: 'Hermione'}
//     ]
//   };
//   res.render(__dirname + '/views/index.html', locals, function(err, output){
//     if(err) throw err;
//     res.send(output);
//   });
// });

