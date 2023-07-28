import { Voting } from "../database/schemas";

export const VotingRepository = {
  verifiedList: async () => await Voting.verifiedList(),
  listToVerify: async () => await Voting.listToVerify(),
  create: async (newVotingData) => Voting.insertNew(newVotingData),
  update: async (voting) => Voting.update(voting),
  getById: async (id: string) => Voting.getById(id),
  // delete: async (id) => Voting.delete(id),
};
