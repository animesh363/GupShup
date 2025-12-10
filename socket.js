var express = require('express');
var app = express();
var Server = require('socket.io');

var server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

var io = Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});


io.on('connection', (socket) => {
    console.log("User connected: " + socket.id);

    // Receive and broadcast name + message to ALL users
    socket.on("chatMessage", (data) => {
        console.log(`Message from ${data.name}: ${data.msg}`);
        io.emit("chatMessage", data); // Broadcast to everyone including sender
    });

    socket.on('disconnect', () => {
        console.log("User disconnected: " + socket.id);
    });
});