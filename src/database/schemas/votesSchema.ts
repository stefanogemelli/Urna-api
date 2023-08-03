import { Schema, Model } from "mongoose";
import { v4 as uuidv4, validate as validateUUID } from "uuid";
import { conn } from "../connection";
import { ClientError } from "../../utils/errors";

export interface IVote {
  _id: string;
  user_id: string;
  voting_id: string;
  option_title: string;
  comment: string;
  deleted: boolean;
}
export interface VoteModel extends Model<IVote> {
  findByVotingId(voting_id: string): Array<IVote>;
  insert(newVote: IVote): Promise<IVote>;
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
    option_title: {
      type: String,
      required: true,
    },
    comment: { type: String, maxlength: 255 },
  },
  { timestamps: true }
);

voteSchema.statics.findByVotingId = async function (voting_id: string) {
  return await this.find({ voting_id });
};

voteSchema.statics.insert = async function (voteData: IVote) {
  const alreadyVoted = await this.findOne({
    user_id: voteData.user_id,
    voting_id: voteData.voting_id,
  });
  if (alreadyVoted) throw new ClientError("Solo puede votar una vez", 406);

  return await this.create(voteData);
};

export const Vote = conn.model<IVote, VoteModel>("Vote", voteSchema);
