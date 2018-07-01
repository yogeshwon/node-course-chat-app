var socket = io();
socket.on('connect', function() {
  console.log('connected to the server');
  // socket.emit('createEmail', {
  //   to: 'yogeshwon"gmail.com',
  //   text: 'Hey, This is Yogesh'
  // });

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


socket.emit('createMessage', {
  from: "Yogesh",
  text: 'Hi'
}, function(data){
  console.log('Got it', data);
});
