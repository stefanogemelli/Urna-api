import { Schema, InferSchemaType, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { conn } from "../connection";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  region_id: string;
  role: string;
  deleted: boolean;
}
export interface UserModel extends Model<IUser> {
  findByEmail(email: string): Array<IUser>;
  list(): Array<IUser>;
  get(): IUser;
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
    role: {
      type: String,
      default: "user",
      validate: (_role: string) => ["user", "moderator", "admin"].includes(_role),
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
userSchema.statics.findByEmail = async function (email) {
  return await this.find({ email }, ["_id", "username", "email", "avatar", "region_id", "role"]);
};

userSchema.statics.list = async function () {
  return await this.find();
};

userSchema.statics.get = async function (id) {
  return await this.findById(id);
};

userSchema.statics.update = async function (userToUpdate) {
  const query = { email: userToUpdate.email };
  return await this.findOneAndUpdate(query, userToUpdate);
};

export const User = conn.model<IUser, UserModel>("User", userSchema);
