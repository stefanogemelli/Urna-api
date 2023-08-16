import { VoteRepository as Vote } from "../repositories";
import { response } from "../utils";

export const getWithResponses = async (req, res) => {
  const { id } = req.params;

  const vote = await Vote.getWithResponses(id);
  response(res, 201, vote);
};

export const create = async (req, res) => {
  const { user_id } = req;
  const { voteData } = req.body;
  voteData.user_id = user_id;

  const newVote = await Vote.create(voteData);
  response(res, 201, newVote);
};

