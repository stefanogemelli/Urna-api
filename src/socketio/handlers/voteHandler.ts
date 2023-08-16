import { VoteRepository } from "../../repositories";

export const voteHandler = (io, socket) => {
  const like = async ({ vote_id }, callback) => {
    const user_id = socket.request.cookies.userData._id;
    try {
      await VoteRepository.like({ vote_id, user_id });
      callback(vote_id);
    } catch (error) {}
  };

  socket.on("vote:like", like);
};
