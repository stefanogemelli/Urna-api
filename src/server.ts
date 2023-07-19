import morgan from "morgan";
import express from "express";
import router from "./routes";

const server = express();

server.use(morgan("dev"));
server.use(express.json());

server.use(router);

export default server;
