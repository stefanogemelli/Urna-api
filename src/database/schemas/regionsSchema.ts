import { Schema, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { conn } from "..";

export interface IRegion {
  _id: string;
  name: string;
}
export interface RegionModel extends Model<IRegion> {
  list(): Array<IRegion>;
  getByName(): IRegion;
  findOrCreate(region: IRegion): IRegion;
  update(region: IRegion): IRegion;
}

const regionSchema = new Schema<IRegion, RegionModel>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    name: { type: String, required: true, unique: true, minlength: 3, maxlength: 40 },
  },
  { timestamps: true }
);

regionSchema.statics.list = async function () {
  return await this.find();
};

regionSchema.statics.getByName = async function (name) {
  return await this.findOne({ name });
};

regionSchema.statics.findOrCreate = async function (regionToCreate) {
  const region = await this.findOne({ name: regionToCreate.name });
  if (region) return region;
  return await Region.create(regionToCreate);
};

regionSchema.statics.update = async function (regionToUpdate) {
  const query = { _id: regionToUpdate._id };
  return await this.findOneAndUpdate(query, regionToUpdate);
};

export const Region = conn.model<IRegion, RegionModel>("Region", regionSchema);
