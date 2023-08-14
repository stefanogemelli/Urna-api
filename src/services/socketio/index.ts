export default function onConnection(io) {
  return function (socket) {
    console.log("Connect", socket.id);
    socket.on("disconnect", () => {
      console.log("Disconnect " + socket.id);
    });

    const joinRoom = ({ roomType, roomId }) => {
      socket.join(`room:${roomType}:${roomId}`);
      console.log(`${socket.id} se unio a la sala: room:${roomType}:${roomId}`);
    };
    const leaveRoom = ({ roomType, roomId }, cb) => {
      socket.leave(`room:${roomType}:${roomId}`);
      console.log(`${socket.id} abandonó la sala: room:${roomType}:${roomId}`);
    };

    socket.on("room:join", joinRoom);
    socket.on("room:leave", leaveRoom);

    socket.on("message", (msg) => {
      socket.broadcast.emit("server:message", msg);
    });
  };
}
