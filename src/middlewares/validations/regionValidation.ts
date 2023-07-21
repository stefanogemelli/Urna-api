import { regionNameValidator } from "./validators";

export const create = (req, res, next) => {
  const newRegion = req.body;
  regionNameValidator(newRegion.name);
  next();
};
