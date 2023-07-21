import { RegionRepository as Region } from "../repositories";
import { response } from "../utils";

export const getRegions = async (req, res) => {
  const regions = await Region.list();
  response(res, 200, regions);
};

export const createRegion = async (req, res) => {
  const regionToCreate = req.body;
  const newRegion = await Region.findOrCreate(regionToCreate);
  response(res, 201, newRegion);
};
