const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3031;

app.get('/', function(req, res) {
    res.sendfile('index.html');
 });

// Whenever someon connects this gets executed
io.on('connection', (socket) => {
    console.log("A user connected");

//Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
    console.log('A user disconnected');
 });
});

// The app listener
http.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});