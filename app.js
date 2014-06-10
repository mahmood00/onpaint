
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var http = require('http');
var path = require('path');

/// Include the node file module
var fs = require('fs-extra');

/// Include ImageMagick
var Imagina = require('imagina');
var im = new Imagina();

var app = express();
var server = require('http').Server(app);
// all environments
//app.use(express.bodyParser();
app.configure(function () {
  app.use(express.bodyParser({ keepExtensions: true}));
  app.set('port', process.env.PORT || 80 );
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  //app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));
});


var ejs = require('ejs');
ejs.open = '<<';
ejs.close = '>>';
app.engine('html', require('ejs').renderFile);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',  function(req, res){
  res.send('<h1>Onpaint</h1>');
});
app.get('/admin',  function(req, res){
  res.send(' 123456asm5');
});





/*var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/
//var io = require('socket.io').listen(server);
var io = require('socket.io')(server);
io.set('transports', ['xhr-polling']);
//io.configure(function () { 
//io.set("polling duration", 30);
io.set("heartbeat timeout", 120);
io.set("heartbeat interval", 25);
//io.set("close timeout", 120);
//});
/*io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});*/
io.sockets.on('connection', function (socket) {
  
  socket.on('data', function (data) {
  	console.log(data);
    socket.broadcast.emit('newobj', data);
  });
  
});
server.listen(app.get('port'), function(){
  console.log('listening on *:'+app.get('port'));
});