import { IVoting } from "../../database/schemas/votingSchema";
import { dateValidator, titleValidator } from "./validators";

export const create = (req, res, next) => {
  const newVoting: IVoting = req.body;

  titleValidator(newVoting.title);
  dateValidator(newVoting.opening_date);
  dateValidator(newVoting.closing_date);

  next();
};
