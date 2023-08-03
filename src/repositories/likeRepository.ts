import { Like } from "../database/schemas";

export const LikeRepository = {
  createOrDelete: async (likeData) => Like.createOrDelete(likeData),
};
