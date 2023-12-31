import {
  allowPropertiesValidator,
  emailValidator,
  usernameValidator,
  avatarValidator,
  idValidator,
} from "./validators";

export const register = (req, res, next) => {
  const { profileInfo } = req.body;

  usernameValidator(profileInfo.username);
  avatarValidator(profileInfo.avatar);
  emailValidator(profileInfo.email);
  idValidator(profileInfo.region_id);

  next();
};

// falta determinar bien los datos a validar en este registro
export const registerOuth0 = (req, res, next) => {
  const newUser = req.body;
  emailValidator(newUser.email);

  next();
};

export const update = (req, res, next) => {
  const newUser = req.body;
  const allowProperties = ["username", "avatar", "region_id"];
  allowPropertiesValidator(newUser, allowProperties);
  emailValidator(newUser.email);

  next();
};
