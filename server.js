var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 4001;

io.on('connection', socket => {
    var userCon = 'User connected';
    console.log('connected');
    io.sockets.emit('userConnected', userCon);
    
    // User Disconnected
    socket.on('disconnect', function () {
        console.log('User Disconnected');
    });

    // When User send Message
    socket.on('sendMsg', (msg, userId) => {
        console.log('message received' + "  "  + msg + "  "  + userId);
        io.sockets.emit('sendMsg', msg, userId)
    })
      
})

http.listen(port, () => console.log(`Listening on port ${port}`))