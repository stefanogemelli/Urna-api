import { Schema, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { conn } from "..";

export interface IVoting {
  _id: string;
  title: string;
  options: Array<string>;
  verified: boolean;
  opening_date: string;
  closing_date: string;
}
export interface VotingModel extends Model<IVoting> {
  verifiedList(): Array<IVoting>;
  listToVerify(): Array<IVoting>;
  update(voting: IVoting): IVoting;
}

const votingSchema = new Schema<IVoting, VotingModel>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    title: { type: String, required: true, unique: true, maxlength: 100 },
    options: [{ type: String, ref: "Options" }],
    verified: { type: Boolean, default: false },
    opening_date: {
      type: String,
      required: true,
      validate: (data: string) => !isNaN(Date.parse(data)),
    },
    closing_date: {
      type: String,
      required: true,
      validate: (data: string) => !isNaN(Date.parse(data)),
    },
  },
  { timestamps: true }
);

votingSchema.statics.verifiedList = async function () {
  return await this.find({ verified: true });
};

votingSchema.statics.listToVerify = async function () {
  return await this.find({ verified: false });
};

votingSchema.statics.update = async function (votingToUpdate) {
  const query = { _id: votingToUpdate._id };
  return await this.findOneAndUpdate(query, votingToUpdate);
};

export const Voting = conn.model<IVoting, VotingModel>("Voting", votingSchema);
