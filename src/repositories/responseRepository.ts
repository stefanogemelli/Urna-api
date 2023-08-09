import { Response } from "../database/schemas";

export const ResponseRepository = {
  create: async (response) => Response.create(response),
  getByVoteId: async (voteId) => Response.getByVoteId(voteId),
  addOrRemoveLike: async (likeDAta: {
    response_id: string;
    user_id: string;
  }): Promise<{ result: string }> => Response.addOrRemoveLike(likeDAta),
};
