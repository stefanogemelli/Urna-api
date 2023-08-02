import { titleValidator, idValidator, descriptionValidator } from "./validators";

export const create = (req, res, next) => {
  const { voteData, user_id } = req.body;

  idValidator(user_id);
  idValidator(voteData.voting_id);
  titleValidator(voteData.option_title);
  if (voteData.comment) descriptionValidator(voteData.comment);

  next();
};
