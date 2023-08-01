import { Schema, Model } from "mongoose";
import { v4 as uuidv4, validate as validateUUID } from "uuid";
import { conn } from "../connection";

export interface IVote {
  _id: string;
  user_id: string;
  voting_id: string;
  option_id: string;
  comment: string;
  deleted: boolean;
}
export interface VoteModel extends Model<IVote> {
  findByVotingId(voting_id: string): Array<IVote>;
}

const voteSchema = new Schema<IVote, VoteModel>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    user_id: {
      type: String,
      ref: "User",
      required: true,
      validate: (user_id: string) => validateUUID(user_id),
    },
    voting_id: {
      type: String,
      ref: "Voting",
      required: true,
      validate: (voting_id: string) => validateUUID(voting_id),
    },
    option_id: {
      type: String,
      ref: "Option",
      required: true,
      validate: (option_id: string) => validateUUID(option_id),
    },
    comment: { type: String, maxlength: 255 },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

voteSchema.statics.findByVotingId = async function (voting_id: string) {
  return await this.find({ voting_id, deleted: false });
};

export const Vote = conn.model<IVote, VoteModel>("Vote", voteSchema);
