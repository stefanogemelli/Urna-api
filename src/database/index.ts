import mongoose from "mongoose";
import { MONGO_URI } from "./config/envs";
import userSchema, { IUser, UserModel } from "./schemas/usersSchema";

const conn = mongoose.createConnection(MONGO_URI);

export const User = conn.model<IUser, UserModel>("User", userSchema);
