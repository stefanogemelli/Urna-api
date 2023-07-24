import { Schema, Model } from "mongoose";
import { v4 as uuidv4, validate as validateUUID } from "uuid";
import { conn } from "../connection";

export interface ILike {
  _id: string;
  user_id: string;
  comment_id: string;
  response_id: string;
  vote_id: string;
}

export interface LikeModel extends Model<ILike> {}

const likeSchema = new Schema<ILike, LikeModel>({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  user_id: {
    type: String,
    required: true,
    validate: (userId: string) => validateUUID(userId),
    ref: "User",
  },
  comment_id: {
    type: String,
    validate: (commentId: string) => validateUUID(commentId),
    ref: "Comment",
  },
  response_id: {
    type: String,
    validate: (responseId: string) => validateUUID(responseId),
    ref: "Response",
  },
  vote_id: {
    type: String,
    validate: (voteId: string) => validateUUID(voteId),
    ref: "Vote",
  },
});

export const Like = conn.model<ILike, LikeModel>("Like", likeSchema);
