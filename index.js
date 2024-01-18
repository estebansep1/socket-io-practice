const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('A user has connected ');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

io.on('connection', (socket) => {
    socket.on('Chat Message', (msg) => {
        io.emit('Chat Message', msg);
    })
})

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
});