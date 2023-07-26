import morgan from "morgan";
import express from "express";
import router from "./routes";
import errorHandler from "./utils/errors/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_BASE_URL } from "./config/envs";
import rateLimit from "express-rate-limit";

const userLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.ip,
  skipFailedRequests: true,
  handler: (req, res) => {
    res.status(429).send("Too many requests from this user, please try again later.");
  },
});
const loopPrevent = rateLimit({
  windowMs: 5 * 1000,
  max: 10,
  keyGenerator: (req) => req.ip,
  skipFailedRequests: true,
  handler: (req, res) => {
    res.status(429).send("Too many requests from this user, please try again later.");
  },
});
const server = express();

server.use(userLimiter, loopPrevent);

server.use(
  cors({
    origin: CLIENT_BASE_URL,
    optionsSuccessStatus: 200,
  })
);
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

server.use(router);

server.use(errorHandler);

export default server;
