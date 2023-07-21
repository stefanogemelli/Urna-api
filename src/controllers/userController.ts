import { UserRepository as User } from "../repositories";
import { response } from "../utils";

export const getUsers = async (req, res) => {
  const users = await User.list();
  response(res, 200, users);
};

export const createUser = async (req, res) => {
  const userToCreate = req.body;
  const newUser = await User.create(userToCreate);
  response(res, 201, newUser);
};

export const createUserWithOuth0 = async (req, res) => {
  const userToCreate = req.body;
  const newUser = await User.findOrCreate(userToCreate);
  response(res, 201, newUser);
};

export const updateUser = async (req, res) => {
  const userToUpdate = req.body;
  const newUser = await User.update(userToUpdate);
  response(res, 201, newUser);
};
