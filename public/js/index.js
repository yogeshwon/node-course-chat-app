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

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank"> My current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
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


  var locationButton = jQuery('#send-location');
  locationButton.on('click', function() {
    if(!navigator.geolocation){
      return alert('Geolocation not supported bu your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocaltionMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
    }, function (){
      alert('Unable to fetch location.');
    });
  });

});
