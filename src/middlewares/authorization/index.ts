import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envs";
import { ClientError } from "../../utils/errors";

const accessVerifier = {
  admin: (role: string) => true,
  moderator: (role: string) => role == "moderator" || role == "user",
  user: (role: string) => role == "user",
};

export const accessRoleChecker = (role: string) => {
  return (req, res, next) => {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    if (accessVerifier[decoded.role](role)) {
      next();
    } else {
      throw new ClientError("Access denied", 401);
    }
  };
};
