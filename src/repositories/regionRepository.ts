import { Region } from "../database/schemas";

export const RegionRepository = {
  list: async () => await Region.list(),
  findOrCreate: async (name) => Region.findOrCreate(name),
  update: async (region) => Region.update(region),
};

// export const create = async (region) => {
//   return Region.create(region);
// };

// export const findOrCreate = async (region) => {
//   return Region.findOrCreate(region);
// };

// export const update = async (region) => {
//   return Region.update(region);
// };
