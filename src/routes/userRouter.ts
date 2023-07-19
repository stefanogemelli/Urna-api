import Router from "express";
// import { User } from "../controllers";
import { User } from "../controllers";

const router = Router();

router.get("/", User.getUsers);

export default router;
