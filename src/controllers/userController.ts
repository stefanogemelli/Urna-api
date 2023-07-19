import { User } from "../repositories";

export const getUsers = async (req, res) => {
  const users = await User.list();
  res.status(200).json(users);
};
