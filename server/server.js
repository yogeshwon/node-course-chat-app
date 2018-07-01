const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage , generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4001;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connect');

  socket.emit('newMessage', {
    from : 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User joined',
    createdAt: new Date().getTime()
  })


  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage' , {
      from: message.from,
      text:message.text,
      createdAt: new Date().getTime()
    });
    callback();
  });

  socket.on('createLocaltionMessage', (coords) => {
    io.emit('newLocationMessage',
    generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnect');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port} `);
});
