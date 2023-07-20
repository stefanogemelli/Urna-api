import { User } from "../repositories";

export const getUsers = async (req, res) => {
  const users = await User.list();
  res.status(200).json(users);
};

export const createUser = async (req, res) => {
  const userToCreate = req.body;
  const newUser = await User.create(userToCreate);
  res.status(201).json(newUser);
};
