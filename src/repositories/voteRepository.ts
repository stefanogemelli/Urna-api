import { Vote } from "../database/schemas";
import { IVote } from "../database/schemas/votesSchema";

export const VoteRepository = {
  getWithResponses: async (id: string): Promise<IVote> => Vote.getWithResponses(id),
  create: async (voteData): Promise<IVote> => Vote.insert(voteData),
  setResponse: async (data) => Vote.setResponse(data),
  getByVotingId: async (votingId: string): Promise<IVote[]> => Vote.findByVotingId(votingId),
  addOrRemoveLike: async (likeDAta: {
    vote_id: string;
    user_id: string;
  }): Promise<{ result: string }> => Vote.addOrRemoveLike(likeDAta),
  like: async (likeDAta: { vote_id: string; user_id: string }): Promise<void> =>
    Vote.like(likeDAta),
};
