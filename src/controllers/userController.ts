import { UserRepository as User } from "../repositories";
import { response } from "../utils";

export const getUsers = async (req, res) => {
  const users = await User.list();
  response(res, 200, users);
};

export const createUser = async (req, res) => {
  const { profileInfo } = req.body;
  const newUser = await User.create(profileInfo);
  response(res, 201, newUser);
};

export const updateUser = async (req, res) => {
  const userToUpdate = req.body;
  const newUser = await User.update(userToUpdate);
  response(res, 201, newUser);
};
