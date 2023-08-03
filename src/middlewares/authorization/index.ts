import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envs";
import { ClientError } from "../../utils/errors";

const accessVerifier = {
  admin: (role: string) => true,
  moderator: (role: string) => role == "moderator" || role == "user",
  user: (role: string) => role == "user",
};

/**
 *
 * @param role user | moderator | admin
 * @returns
 */
export const accessChecker = (role: string) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;

      const decoded = jwt.verify(token, JWT_SECRET);

      if (accessVerifier[decoded.role](role)) {
        req.user_id = decoded.user_id;
        next();
      } else {
        throw new ClientError("Access denied", 401);
      }
    } catch (error) {
      throw new ClientError(error.message, 401);
    }
  };
};
