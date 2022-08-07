const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.send("ali nejati");
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('messageClient', (message) => {
        console.log("massage");
        socket.broadcast.emit('messageServer', {message, sender: socket.username});
    });

    socket.on('register', (username) => {
        console.log("user " + username + " registered.");
        socket.username = username;
        socket.emit('usernameGot');
        socket.broadcast.emit('welcome', username);
    });

    socket.on('disconnect', () => {
        console.log("user: " + socket.username ?? "unName" + " disconnected!.")
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});