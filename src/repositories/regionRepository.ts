import { Region } from "../database/schemas";

export const RegionRepository = {
  list: async () => await Region.list(),
  findOrCreate: async (name) => Region.findOrCreate(name),
  update: async (region) => Region.update(region),
};
