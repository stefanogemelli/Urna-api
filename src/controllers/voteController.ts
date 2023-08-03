import { VoteRepository as Vote } from "../repositories";
import { response } from "../utils";

export const create = async (req, res) => {
  const { user_id } = req.body;
  const { voteData } = req.body;
  voteData.user_id = user_id;

  const newVote = await Vote.create(voteData);
  response(res, 201, newVote);
};

export const like = async (req, res) => {
  const { user_id } = req;
  const { id: vote_id } = req.params;

  const likeData = { user_id, vote_id };
  const result = await Vote.addOrRemoveLike(likeData);
  response(res, 201, result);
};
