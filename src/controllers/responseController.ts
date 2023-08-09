import { ResponseRepository as Response, VoteRepository as Vote } from "../repositories";
import { response } from "../utils";

export const getByVoteId = async (req, res) => {
  const { id } = req.params;
  const responses = await Response.getByVoteId(id);
  response(res, 200, responses);
};

export const create = async (req, res) => {
  const { responseData } = req.body;
  const { user_id } = req;

  responseData.emitter_id = user_id;
  const newResponse = await Response.create(responseData);
  const updatedVote = await Vote.setResponse({
    vote_id: newResponse.vote_id,
    response_id: newResponse._id,
  });
  response(res, 201, { newResponse, updatedVote });
};

export const like = async (req, res) => {
  const { user_id } = req;
  const { id: response_id } = req.params;

  const likeData = { user_id, response_id };
  const result = await Response.addOrRemoveLike(likeData);
  response(res, 201, result);
};
