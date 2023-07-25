import { URLSearchParams } from "url";
import { UserRepository as User } from "../repositories";
import jwt from "jsonwebtoken";
import { CLIENT_BASE_URL, JWT_SECRET } from "../config/envs";

export const getUser = async (req, res) => {
  const userDataFromAuth0 = req.oidc.user;

  const userData = await User.findByEmail(userDataFromAuth0.email);

  if (userData.length > 0) {
    const userInfo = JSON.parse(JSON.stringify(userData[0] ?? {}));

    const token = jwt.sign({ email: userInfo.email, role: userInfo.role }, JWT_SECRET);
    userInfo.token = token;

    const queryParams = new URLSearchParams(userInfo).toString();
    
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    res.redirect(302, `${CLIENT_BASE_URL}/votations?${queryParams}`);
  } else {
    const userInfo = {
      username: userDataFromAuth0.nickname,
      email: userDataFromAuth0.email,
    };
    const queryParams = new URLSearchParams(userInfo).toString();

    res.redirect(302, `${CLIENT_BASE_URL}/profile/complete?${queryParams}`);
  }
};
