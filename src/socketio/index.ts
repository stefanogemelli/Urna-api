import { responseHandler, voteHandler } from "./handlers";

export default function onConnection(io) {
  return function (socket) {
    console.log("Connect", socket.id);
    socket.on("disconnect", () => {
      console.log("Disconnect " + socket.id);
    });

    const joinRoom = ({ room, roomId }) => {
      const socketRooms = Array.from(socket.rooms);
      const filteredRooms = socketRooms.filter((_room: string) => _room.startsWith(`room:${room}`));
      if (filteredRooms.length > 0) {
        filteredRooms.forEach((filteredRoom) => {
          if (filteredRoom !== `room:${room}:${roomId}`) {
            socket.leave(filteredRoom);
          }
        });
      }
      socket.join(`room:${room}:${roomId}`);

      // sacar antes de producción
      console.log(`${socket.id} se unio a la sala: room:${room}:${roomId}`);
    };
    const leaveRoom = ({ room, roomId }, cb) => {
      socket.leave(`room:${room}:${roomId}`);

      // sacar antes de producción
      console.log(`${socket.id} abandonó la sala: room:${room}:${roomId}`);
    };

    socket.on("room:join", joinRoom);
    socket.on("room:leave", leaveRoom);

    voteHandler(io, socket);
    responseHandler(io, socket);
  };
}
