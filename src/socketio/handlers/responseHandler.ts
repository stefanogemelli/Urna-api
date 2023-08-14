import { ResponseRepository, VoteRepository } from "../../repositories";

export const responseHandler = (io, socket) => {
  const create = async (responseData, cb) => {
    const user_id = socket.request.cookies.userData._id;
    responseData.emitter_id = user_id;

    const newResponse = await ResponseRepository.create(responseData);

    // setear la response en el voto
    const updatedVote = await VoteRepository.setResponse({
      vote_id: newResponse.vote_id,
      response_id: newResponse._id,
    });
    // socket.broadcast.emit("response:new", { newResponse, updatedVote });
    cb(responseData);
    socket
      .to(`room:vote:${newResponse.vote_id}`)
      .emit("response:new", { newResponse, updatedVote });
  };

  const like = (orderId, callback) => {
    // ...
  };

  const dislike = (orderId, callback) => {
    // ...
  };

  socket.on("response:create", create);
  socket.on("response:like", like);
  socket.on("response:dislike", dislike);
};
