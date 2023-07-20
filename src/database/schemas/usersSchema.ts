// const { Schema } = require("mongoose");
import { Schema, InferSchemaType, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { conn } from "..";

// ejemplo de referencia
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  region_id: string;
}
export interface UserModel extends Model<IUser> {
  list(): Array<IUser>;
}

const userSchema = new Schema<IUser, UserModel>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String },
    avatar: { type: String },
    region_id: { type: String, ref: "Region" },
  },
  { timestamps: true }
);

userSchema.statics.list = async function () {
  return await this.find();
};

userSchema.statics.get = async function (id) {
  return await this.findById(id);
};

export const User = conn.model<IUser, UserModel>("User", userSchema);
