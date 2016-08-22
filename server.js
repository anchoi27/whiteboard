var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);

var socketio = require('socket.io');
var io = socketio(server);


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
    console.log('A new client has connected!');
    socket.on('selfdrawing', function(start, end, strokeColor) {
      socket.broadcast.emit('sendingdrawing', start, end, strokeColor);
    });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    })
});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = io;
