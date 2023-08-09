import { Schema, Model } from "mongoose";
import { v4 as uuidv4, validate as validateUUID } from "uuid";
import { conn } from "../connection";

export interface IResponse {
  _id: string;
  vote_id: string;
  emitter_id: string;
  receiver_id: string;
  body: string;
  pinned: boolean;
  likes: Array<string>;
  deleted: boolean;
}

export interface ResponseModel extends Model<IResponse> {
  getByVoteId(id: string): Array<IResponse>;
  addOrRemoveLike(likeData: { user_id: string; response_id: string }): { result: string };
}

const responseSchema = new Schema<IResponse, ResponseModel>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    vote_id: {
      type: String,
      required: true,
      validate: (voteId: string) => validateUUID(voteId),
      ref: "Vote",
    },
    emitter_id: {
      type: String,
      required: true,
      validate: (emitterId: string) => validateUUID(emitterId),
      ref: "User",
    },
    receiver_id: {
      type: String,
      required: true,
      validate: (receiverId: string) => validateUUID(receiverId),
      ref: "User",
    },
    body: {
      type: String,
      maxlength: 255,
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    likes: [{ type: String, ref: "User", default: [] }],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
responseSchema.statics.getByVoteId = async function (vote_id) {
  return await this.find({ vote_id });
};

responseSchema.statics.addOrRemoveLike = async function (likeData) {
  const { response_id, user_id } = likeData;
  const response = await this.findById(response_id);
  if (response.likes.includes(user_id)) {
    response.likes = response.likes.filter((like) => like !== user_id);
    await response.save();
    return { result: "dislike" };
  }
  response.likes.push(user_id);
  await response.save();
  return { result: "like" };
};

export const Response = conn.model<IResponse, ResponseModel>("Response", responseSchema);
