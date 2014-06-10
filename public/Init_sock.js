
var urlToConnct = '//onpaint-20005.onmodulus.net/';


var socket = io();

socket.on('connect', function () {
	Android.showToast('connected  successfully');
});
socket.on('disconnect', function () {
	Android.showToast('disconnect !!');
});
socket.on('connect_failed', function () {
	Android.showToast('connect_failed');
});
socket.on('error', function () {
	Android.showToast('there is some error in connection , please check your connection');
});
socket.on('reconnect_failed', function () {
	Android.showToast('reconnect_failed');
});
socket.on('reconnect', function () {
	Android.showToast('successfully reconnected');
});