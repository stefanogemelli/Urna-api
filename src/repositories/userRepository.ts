import { User } from "../database/schemas";

export const UserRepository = {
  list: async () => await User.list(),
  create: async (user) => User.create(user),
  findByEmail: async (email: string) => User.findByEmail(email),
  update: async (user) => User.update(user),
};
