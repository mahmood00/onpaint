
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var http = require('http');
var path = require('path');

// Include the node file module
var fs = require('fs-extra');

// Include ImageMagick
var Imagina = require('imagina');
var im = new Imagina();
var port = process.env.PORT || 80;
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(port, function () {
  console.log('Server listening at port ' + port);
});
// all environments
//app.use(express.bodyParser();
app.configure(function () {
  app.use(express.bodyParser({ keepExtensions: true}));
  app.set('port', port );
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
  res.send('pass.123456asm5Admin');
});





/*var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/
//var io = require('socket.io').listen(server);

//io.set('transports', ['xhr-polling']);
//io.configure(function () { 
//io.set("polling duration", 30);
//io.set("heartbeat timeout", 120);
//io.set("heartbeat interval", 25);
//io.set("close timeout", 120);
//});
/*io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});*/
var rooms = {};

io.on('connection', function (socket) {
	  console.log('clint connected');
	  socket.joined = false;
	  
	  socket.on('data', function ( data) {
		if (socket.joined == true ){
			//socket.broadcast.emit('newobj', data);
			socket.broadcast.to(socket.room).emit('newobj', data);
			console.log(data);
		}
		else
			console.log('not joined');
	  });
	  
	  socket.on('join', function(data) {
		console.log('tried to conect : '+data.room);
        socket.username = data.username;
        socket.room = data.room;
		if (typeof(rooms[data.room]) == 'undefined') 
			rooms[data.room] = 1;
		else
			rooms[data.room]+=1;
        socket.join(data.room);
		socket.joined = true;
		console.log('clint join room : '+data.room);
        //socket.broadcast.to('Lobby').emit('updatechat',' something');
    });
	socket.on('leave', function(data) {
        
		if (socket.joined == true ){	
			if(rooms[socket.room] == 1)
				delete rooms[socket.username];
			else
				rooms[socket.room]-=1;
			socket.leave(socket.room);
			console.log('clint disconnected and leaft room : '+socket.room);
			socket.joined = false;
		}
    });
	socket.on('disconnect', function () {
		if (socket.joined == true ){	
			if(rooms[socket.room] == 1)
				delete rooms[socket.username];
			else
				rooms[socket.room]-=1;
			socket.leave(socket.room);
			console.log('clint disconnected and leaft room : '+socket.room);
		}
		else
			console.log('clint disconnected without connected any room');
		socket.joined = false;
			
	  });
});
;