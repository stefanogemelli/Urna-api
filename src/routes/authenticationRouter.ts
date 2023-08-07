import Router from "express";
import { catchedAsync } from "../utils";
import { auth } from "express-openid-connect";
import { Authentication } from "../controllers";
import dotenv from "dotenv";
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
};

const router = Router();

router.use("/", auth(config));

router.get("/", catchedAsync(Authentication.getUser));

router.post("/logout", catchedAsync(Authentication.logout));

export default router;
