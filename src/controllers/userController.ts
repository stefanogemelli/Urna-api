import repository from "../repositories";
const { User } = repository;

export const getUsers = async (req, res) => {
  const users = await User.list();
  res.status(200).json(users);
};
