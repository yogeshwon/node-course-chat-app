const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage , generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4001;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connect');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user Joined'));

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name)  ||  !isRealString(params.room) ){
      callback('Name and room name are not required.');
    }

    socket.join(params.room);

    //io.emit
      //socket.broadcast.emit
      //socket.emit

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
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
