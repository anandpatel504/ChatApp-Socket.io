const express = require('express');
const app = express();
const http = require("http");
const io = require('socket.io')(3031);
const users = {};

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

//         //Someone is typing
//     socket.on("typing", data => {
//         socket.broadcast.emit("notifyTyping", {
//         user: data.user,
//         message: data.message
//         });
//     });

//     //when soemone stops typing
//     socket.on("stopTyping", () => {
//         socket.broadcast.emit("notifyStopTyping");
//     });

//     socket.on('display', (data)=>{
//         if(data.typing==true)
//           $('.typing').text(`${data.user} is typing...`)
//         else
//           $('.typing').text("")
//       })
})

// // app listener
// http.listen(PORT, () => {
//     console.log("Running on Port: " + PORT);
//   });
  