import { Option } from "../database/schemas";

export const OptionRepository = {
  list: async () => await Option.list(),
  create: async (newOption) => await Option.create(newOption),
};
