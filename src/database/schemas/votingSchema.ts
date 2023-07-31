import { Schema, Model } from "mongoose";
import { v4 as uuidv4, validate as validateUUID } from "uuid";
import { conn } from "../connection";

export interface IOption {
  title: string;
  images: Array<string>;
}
export interface IVoting {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  options: Array<IOption>;
  verified: boolean;
  opening_date: string;
  closing_date: string;
}
export interface VotingModel extends Model<IVoting> {
  verifiedList(): Array<IVoting>;
  listToVerify(): Array<IVoting>;
  update(voting: IVoting): IVoting;
  getById(id: string): IVoting;
  insertNew(newVotingData): IVoting;
  getTitles():Array<{_id:string,title:string}>;
}

const votingSchema = new Schema<IVoting, VotingModel>(
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
    title: { type: String, required: true, unique: true, maxlength: 100 },
    description: { type: String, required: true, unique: true, maxlength: 255 },
    options: [
      {
        title: { type: String, required: true },
        images: [{ type: String }],
      },
    ],
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

votingSchema.statics.getById = async function (id: string) {
  return await this.findById(id, [
    "_id",
    "title",
    "description",
    "options",
    "opening_date",
    "closing_date",
  ]).populate("options", ["_id", "title", "image"]);
};

votingSchema.statics.insertNew = async function (newVotingData) {
  const { _id, title, description, options, opening_date, closing_date } = await this.create(
    newVotingData
  );
  return { _id, title, description, options, opening_date, closing_date };
};

votingSchema.statics.getTitles = async function () {
  return await this.find({},["title"]);
};

export const Voting = conn.model<IVoting, VotingModel>("Voting", votingSchema);
