import { Vote } from "../database/schemas";
import { IVote } from "../database/schemas/votesSchema";

export const VoteRepository = {
  create: async (voteData): Promise<IVote> => Vote.create(voteData),
  getByVotingId: async (votingId: string): Promise<IVote[]> => Vote.findByVotingId(votingId),
};
