import Router from "express";
// import { User } from "../controllers";
import { User } from "../controllers";
import catchedAsync from "../utils/catchedAsync";

const router = Router();

router.get("/", catchedAsync(User.getUsers));

router.post("/", catchedAsync(User.createUser));

export default router;
