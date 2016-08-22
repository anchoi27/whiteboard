var socket = io(window.location.origin);


whiteboard.on('draw', function(start, end, strokeColor) {
  socket.emit('selfdrawing', start, end, strokeColor)

})

socket.on('sendingdrawing', function(start, end, strokeColor) {
  whiteboard.draw(start, end, strokeColor);
})
