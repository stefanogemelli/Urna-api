import { URLSearchParams } from "url";
import { UserRepository as User } from "../repositories";
import dotenv from "dotenv";
dotenv.config();

export const getUser = async (req, res) => {
  const userDataFromAuth0 = req.oidc.user;

  const userData = await User.findByEmail(userDataFromAuth0.email);

  if (userData.length < 0) {
    const userInfo = JSON.parse(JSON.stringify(userData[0] ?? {}));
    const queryParams = new URLSearchParams(userInfo).toString();

    res.redirect(302, `${process.env.CLIENT_BASE_URL}/votations?${queryParams}`);
  } else {
    const userInfo = {
      username: userDataFromAuth0.nickname,
      email: userDataFromAuth0.email,
    };
    const queryParams = new URLSearchParams(userInfo).toString();

    res.redirect(302, `${process.env.CLIENT_BASE_URL}/profile/complete?${queryParams}`);
  }
};
