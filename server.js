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
        socket.broadcast.emit('messageServer', message);
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});