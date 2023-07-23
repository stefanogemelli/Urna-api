import { Vote } from "../database/schemas";
import { IVote } from "../database/schemas/votesSchema";

export const VoteRepository = {
  create: async (vote: IVote): Promise<IVote> => Vote.create(vote),
  delete: async (vote_id: string): Promise<IVote | {}> => Vote.delete(vote_id),
};
