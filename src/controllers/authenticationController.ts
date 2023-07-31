import { URLSearchParams } from "url";
import { UserRepository as User } from "../repositories";
import jwt from "jsonwebtoken";
import { CLIENT_BASE_URL, JWT_SECRET } from "../config/envs";

export const getUser = async (req, res) => {
  const userDataFromAuth0 = req.oidc.user;

  const userData = await User.findByEmail(userDataFromAuth0.email);

  if (userData.length > 0) {
    const userInfo = JSON.parse(JSON.stringify(userData[0] ?? {}));

    const token = jwt.sign({ user_id: userInfo._id, role: userInfo.role }, JWT_SECRET);

    res.cookie("token", token, { HttpOnly: true, maxAge: 3600000 });
    res.cookie("userData", userInfo, { maxAge: 3600000 });

    res.redirect(302, `${CLIENT_BASE_URL}/votations`);
  } else {
    const userInfo = {
      username: userDataFromAuth0.nickname,
      email: userDataFromAuth0.email,
    };
    res.cookie("username", userInfo.username, {
      maxAge: 3600000,
    });
    res.cookie("email", userInfo.email, {
      maxAge: 3600000,
    });
    res.redirect(302, `${CLIENT_BASE_URL}/profile/complete`);
  }
};
