import { ClientError } from "../../utils/errors";

export const allowPropertiesValidator = (objectData, allowProperties: Array<String>) => {
  if (Object.keys(objectData).some((prop) => !allowProperties.includes(prop)))
    throw new ClientError("Disallowed properties", 403);
};
export const emailValidator = (email: string) => {
  if (email.length >= 6 && email.length <= 255) return;
  throw new ClientError("The email should have between 6 and 255 characters", 400);
};

export const passwordValidator = (password: string) => {
  if (password.length >= 6 && password.length <= 40) return;
  throw new ClientError("The password should have between 6 and 40 characters", 400);
};
