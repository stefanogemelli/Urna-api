import { Schema, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { conn } from "../connection";

export interface IOption {
  _id: string;
  title: string;
  image: string;
}

export interface OptionModel extends Model<IOption> {
  list(): Array<IOption>;
}

const optionSchema = new Schema<IOption, OptionModel>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    title: { type: String, required: true, unique: true, maxlength: 100 },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

optionSchema.statics.list = async function () {
  return await this.find();
};

export const Option = conn.model<IOption, OptionModel>("Option", optionSchema);
