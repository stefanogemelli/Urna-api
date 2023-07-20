import { User } from "../database";

export const list = async () => {
  return await User.list();
};

export const create = async (user) => {
  return User.create(user);
};

export const findOrCreate = async (user) => {
  return User.findOrCreate(user);
};

export const update = async (user) => {
  return User.update(user);
};
