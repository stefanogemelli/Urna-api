import { ClientError } from "../../utils/errors";

export const allowPropertiesValidator = (objectData, allowProperties: Array<String>) => {
  if (Object.keys(objectData).some((prop) => !allowProperties.includes(prop)))
    throw new ClientError("Disallowed properties", 403);
};
export const emailValidator = (email: string) => {
  if (email.length >= 6 && email.length <= 255) return;
  throw new ClientError("The email must have between 6 and 255 characters", 400);
};

export const passwordValidator = (password: string) => {
  if (password.length >= 6 && password.length <= 40) return;
  throw new ClientError("The password must have between 6 and 40 characters", 400);
};

export const regionNameValidator = (name: string) => {
  if (name.length >= 3 && name.length <= 40) return;
  throw new ClientError("The name must have between 3 and 40 characters", 400);
};

export const titleValidator = (name: string) => {
  if (name.length <= 100) return;
  throw new ClientError("The title must have less than 100 characters", 400);
};

export const dateValidator = (dateString: string) => {
  const date = Date.parse(dateString);
  if (isNaN(date)) throw new ClientError("Invalid date format", 400);
};
