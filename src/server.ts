import morgan from "morgan";
import express from "express";
import router from "./routes";
import errorHandler from "./utils/errors/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_BASE_URL } from "./config/envs";

const server = express();

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
