import { User } from "../database";

export const list = async () => {
  return await User.list();
};

export const create = async (user) => {
  return User.create(user);
};
