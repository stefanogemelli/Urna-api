import { User } from "../database/schemas";

export const UserRepository = {
  list: async () => await User.list(),
  create: async (user) => User.create(user),
  findOrCreate: async (user) => User.findOrCreate(user),
  update: async (user) => User.update(user),
};
