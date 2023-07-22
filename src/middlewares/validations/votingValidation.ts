import { IVoting } from "../../database/schemas/votingSchema";
import { dateValidator, titleValidator, idValidator, descriptionValidator } from "./validators";

export const create = (req, res, next) => {
  const newVoting: IVoting = req.body;

  idValidator(newVoting.user_id);
  titleValidator(newVoting.title);
  descriptionValidator(newVoting.description);
  dateValidator(newVoting.opening_date);
  dateValidator(newVoting.closing_date);

  next();
};
