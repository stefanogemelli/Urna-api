import { Vote } from "../database/schemas";
import { IVote } from "../database/schemas/votesSchema";

export const VoteRepository = {
  create: async (voteData): Promise<IVote> => Vote.insert(voteData),
  getByVotingId: async (votingId: string): Promise<IVote[]> => Vote.findByVotingId(votingId),
  addOrRemoveLike: async (likeDAta: {
    vote_id: string;
    user_id: string;
  }): Promise<{ result: string }> => Vote.addOrRemoveLike(likeDAta),
};
