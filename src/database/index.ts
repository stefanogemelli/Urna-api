import mongoose from "mongoose";
import { MONGO_URI } from "./config/envs";

export const conn = mongoose.createConnection(MONGO_URI);

export { User } from "./schemas/usersSchema";
