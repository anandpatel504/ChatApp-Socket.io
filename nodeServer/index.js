const express = require('express');
const app = express();
const socket = require('socket.io');
const users = {};
const PORT = process.env.PORT || 3031;

server = app.listen(PORT, () => {
    console.log("Running on Port: " + PORT);
});

const io = socket(server);

io.on('connection', socket =>{
    // If any new user joins, let other connected to the server know!
    socket.on('new-user-joined', name =>{
        console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // If someone leaves the chat, let others know
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})


  