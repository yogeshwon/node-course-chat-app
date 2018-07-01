const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4001;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connect');

  // socket.emit('newEmail', {
  //   from:'yogeshwon@gmail.com',
  //   text:'Hey ',
  //   createdAt: 123
  // });


  // socket.on('createEmail' , (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage' , {
      from: message.from,
      text:message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnect');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port} `);
});
