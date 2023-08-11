export default function onConnection(io) {
  return function (socket) {
    console.log(socket.id);

    socket.on("joinRoom", ({ room, username }, cb) => {
      socket.join(room);
      cb("mensaje para el log del cb");
      socket.broadcast.emit("joinRoom_response", username + " se unión a la room " + room);
    });

    socket.on("message", (msg) => {
      socket.broadcast.emit("messageFromServer", msg);
    });
  };
}
