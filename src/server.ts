import morgan from "morgan";
import express from "express";
import router from "./routes";
import errorHandler from "./utils/errors/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_BASE_URL } from "./config/envs";
import rateLimit from "express-rate-limit";

import { createServer } from "http";
import { Server } from "socket.io";
import onConnection from "./socketio";

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
  windowMs: 10 * 1000,
  max: 15,
  keyGenerator: (req) => req.ip,
  skipFailedRequests: true,
  handler: (req, res) => {
    res.status(429).send("Too many requests from this user, please try again later.");
    process.exit(1);
  },
});
const server = express();
server.use(
  cors({
    origin: CLIENT_BASE_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

server.use(userLimiter, loopPrevent);

server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

server.use(router);

server.use(errorHandler);

// socket.io
const httpServer = createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_BASE_URL,
    credentials: true,
  },
});

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request, next);
});
io.on("connection", onConnection(io));

export default httpServer;
