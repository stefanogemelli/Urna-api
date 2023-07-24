import { Schema, Model } from "mongoose";
import { v4 as uuidv4, validate as validateUUID } from "uuid";
import { conn } from "../connection";

export interface IResponse {
  _id: string;
  comment_id: string;
  emitter_id: string;
  receiver_id: string;
  body: string;
  pinned: boolean;
  deleted: boolean;
}

export interface ResponseModel extends Model<IResponse> {}

const responseSchema = new Schema<IResponse, ResponseModel>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    comment_id: {
      type: String,
      required: true,
      unique: true,
      validate: (commentId: string) => validateUUID(commentId),
      ref: "Comment",
    },
    emitter_id: {
      type: String,
      required: true,
      unique: true,
      validate: (emitterId: string) => validateUUID(emitterId),
      ref: "User",
    },
    receiver_id: {
      type: String,
      required: true,
      unique: true,
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
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Response = conn.model<IResponse, ResponseModel>("Response", responseSchema);
