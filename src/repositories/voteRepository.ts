import { Vote } from "../database/schemas";
import { IVote } from "../database/schemas/votesSchema";

export const VoteRepository = {
  create: async (vote: IVote): Promise<IVote> => Vote.create(vote),
  getByVotingId: async (votingId: string): Promise<IVote[]> => Vote.findByVotingId(votingId),
};
