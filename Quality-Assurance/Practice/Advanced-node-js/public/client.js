$(document).ready(function () {
  /* Global io*/
  let socket = io();

  socket.on('user count', function (data) {
    console.log(data);
  });

  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    let messageToSend = $('#m').val();
    // Send message to server here?
    $('#m').val('');
    return false; // Prevent form submit from refreshing page
  });
});