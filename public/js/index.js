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

socket.on('newMessage', function(message){
  console.log('newMessage' , message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery( document ).ready(function() {
  jQuery('#message-form').on('submit', function(event){
    event.preventDefault();
    socket.emit('createMessage' , {
      from: 'User',
      text: jQuery('[name=message]').val()
    }, function() {

    });
  });
});
