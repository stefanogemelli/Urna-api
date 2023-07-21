import { Voting } from "../database/schemas";

export const VotingRepository = {
  verifiedList: async () => await Voting.verifiedList(),
  listToVerify: async () => await Voting.listToVerify(),
  create: async (voting) => Voting.create(voting),
  update: async (voting) => Voting.update(voting),
  // delete: async (id) => Voting.delete(id),
};
