var SerialPort = require("serialport").SerialPort
var app = require('express')();
var static = require('serve-static');
var http =require('http').Server(app);
var io = require('socket.io')(http);
// var TextDecoder = require('text-encoding');
app.use(static('public'));
app.get('/', function (req, res) {
	res.sendFile(__dirname+'/new.html');
});

//ls -l /dev/ttyUSB*
io.on('connection', function(socket) {
	console.log('a new connection');
	var serialPort = new SerialPort("COM4", {
	  baudrate: 24000
	});

	serialPort.on('data', function (data) {
	  	var strUid = data.toString("utf-8");
		socket.emit('uid', strUid);
		console.log(strUid);

	});
});

http.listen(3000, function () {
	console.log('listen on : 3000');

});


