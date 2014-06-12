
var ROOM='' ; 
var USERNAME ='';; 
function setRoom(value){
	ROOM = value;
}
function setUsername(value){
	USERNAME = value;
}
var socket = io('https://onpaint-20005.onmodulus.net' , { reconnection:true , reconnectionDelay:100 , reconnectionDelayMax:1000 });
//socket.connect();
//console.log('after connect');

function join(uname , roomid){
	socket.emit('join', {username: uname , room : roomid });
	console.log('joined at Room ');
}
function leave(roomid){
	socket.emit('leave', { room : roomid });
	console.log('you are leaft this room !!');
}

socket.on('connect', function () {
	if(ROOM != '')
		join(ROOM , USERNAME);
	console.log('connected  successfully');
});
socket.on('disconnect', function () {
	console.log('disconnect !!');
});
socket.on('connect_failed', function () {
	console.log('connect_failed');
});
socket.on('error', function () {
	console.log('there is some error in connection , please check your connection');
});
socket.on('reconnect_failed', function () {
	console.log('reconnect_failed');
});
socket.on('reconnect', function () {
	console.log('successfully reconnected');
});
socket.on('connect_timeout', function () {
	console.log('connect timeout !!');
});

