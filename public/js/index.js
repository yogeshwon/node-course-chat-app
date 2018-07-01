var socket = io();
socket.on('connect', function() {
  console.log('connected to the server');
  // socket.emit('createEmail', {
  //   to: 'yogeshwon"gmail.com',
  //   text: 'Hey, This is Yogesh'
  // });
  socket.emit('createMessage', {
    form: 'Yogesh',
    test:'hi'
  })
});
socket.on('', function() {
  console.log('Disconnected from server');
});


// socket.on('newEmail' , function(email) {
//   console.log('New Eamil' , email);
// })


socket.on('newMessage', function(message){
  console.log('newMessage' , message);
})
