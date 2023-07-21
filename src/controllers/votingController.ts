import { VotingRepository as Voting } from "../repositories";
import { response } from "../utils";

export const getAll = async (req, res) => {
  const { verified = "true" } = req.query;
  const method = {
    true: "verifiedList",
    false: "listToVerify",
  };
  const votingList = await Voting[method[verified]]();
  response(res, 200, votingList);
};

export const create = async (req, res) => {
  const votingToCreate = req.body;
  const newVoting = await Voting.create(votingToCreate);
  response(res, 201, newVoting);
};
