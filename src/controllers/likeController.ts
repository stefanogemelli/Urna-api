import { LikeRepository as Like } from "../repositories";
import { response } from "../utils";

export const create = async (req, res) => {
  const { vote_id, response_id } = req.body;
  const { user_id } = req;
  console.log(req.body);

  const likeData = { user_id };
  if (vote_id) likeData["vote_id"] = vote_id;
  else likeData["response_id"] = response_id;

  console.log(vote_id);

  const likeOrDislike = await Like.createOrDelete(likeData);
  response(res, 201, likeOrDislike);
};
