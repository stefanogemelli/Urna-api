import { Schema, Model } from "mongoose";
import { v4 as uuidv4, validate as validateUUID } from "uuid";
import { conn } from "../connection";

export interface IComment {
  _id: string;
  user_id: string;
  vote_id: string;
  body: string;
  deleted: boolean;
}

export interface CommentModel extends Model<IComment> {}

const commentSchema = new Schema<IComment, CommentModel>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    user_id: {
      type: String,
      required: true,
      unique: true,
      validate: (userId: string) => validateUUID(userId),
      ref: "User",
    },
    vote_id: {
      type: String,
      required: true,
      unique: true,
      validate: (voteId: string) => validateUUID(voteId),
      ref: "Vote",
    },
    body: {
      type: String,
      maxlength: 255,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Comment = conn.model<IComment, CommentModel>("Comment", commentSchema);
