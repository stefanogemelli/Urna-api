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
  get(): IUser;
  findOrCreate(user: IUser): IUser;
  update(user: IUser): IUser;
}

const userSchema = new Schema<IUser, UserModel>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 40 },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      minlength: 6,
      maxlength: 255,
    },
    password: { type: String, minlength: 6, maxlength: 40 },
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

userSchema.statics.findOrCreate = async function (userToCreate) {
  const user = await this.findOne({ email: userToCreate.email });
  if (user) return user;
  return await User.create(userToCreate);
};

userSchema.statics.update = async function (userToUpdate) {
  const query = { email: userToUpdate.email };
  return await this.findOneAndUpdate(query, userToUpdate);
};

export const User = conn.model<IUser, UserModel>("User", userSchema);
