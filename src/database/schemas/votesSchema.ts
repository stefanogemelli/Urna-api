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
  likes: Array<string>;
  responses: Array<string>;
}
export interface VoteModel extends Model<IVote> {
  findByVotingId(voting_id: string): any;
  getWithResponses(id: string): IVote;
  insert(newVote: IVote): IVote;
  setResponse(data): IVote;
  addOrRemoveLike(likeData: { user_id: string; vote_id: string }): { result: string };
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
    likes: [{ type: String, ref: "User", validate: (user_id: string) => validateUUID(user_id) }],
    responses: [
      {
        type: String,
        ref: "Response",
        validate: (response_id: string) => validateUUID(response_id),
      },
    ],
  },
  { timestamps: true }
);

voteSchema.statics.findByVotingId = async function (voting_id: string) {
  return await this.find({ voting_id }).populate("user_id", ["username"]);
};

voteSchema.statics.getWithResponses = async function (id: string) {
  return await this.findById(id)
    .populate("user_id", ["_id", "username", "avatar"])
    .populate({
      path: "responses",
      populate: { path: "receiver_id", select: "username avatar" },
    })
    .populate({
      path: "responses",
      populate: { path: "emitter_id", select: "username avatar" },
    });
};
voteSchema.statics.insert = async function (voteData: IVote) {
  const alreadyVoted = await this.findOne({
    user_id: voteData.user_id,
    voting_id: voteData.voting_id,
  });
  if (alreadyVoted) throw new ClientError("Solo puede votar una vez", 406);

  return await this.create(voteData);
};
voteSchema.statics.addOrRemoveLike = async function (likeData) {
  const { vote_id, user_id } = likeData;
  const vote = await this.findById(vote_id);
  if (vote.likes.includes(user_id)) {
    vote.likes = vote.likes.filter((like) => like !== user_id);
    await vote.save();
    return { result: "dislike" };
  }
  vote.likes.push(user_id);
  await vote.save();
  return { result: "like" };
};

voteSchema.statics.setResponse = async function (responseData) {
  const vote = await this.findById(responseData.vote_id);
  vote.responses.push(responseData.response_id);
  vote.save();
  return vote;
};

export const Vote = conn.model<IVote, VoteModel>("Vote", voteSchema);
