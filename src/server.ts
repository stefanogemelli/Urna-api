import morgan from "morgan";
import express from "express";
import router from "./routes";
import errorHandler from "./utils/errors/errorHandler";
import cookieParser from "cookie-parser"

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

server.use(router);

server.use(errorHandler);

export default server;
