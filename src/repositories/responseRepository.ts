import { Response } from "../database/schemas";

export const ResponseRepository = {
  create: async (response) => Response.create(response),
  getByVoteId: async (voteId) => Response.getByVoteId(voteId),
};
