import Router from "express";
import { Like } from "../controllers";
import { catchedAsync } from "../utils";
import { accessChecker } from "../middlewares/authorization";
// import { likeValidation } from "../middlewares/validations";

const router = Router();

router.post("/", accessChecker("user"), catchedAsync(Like.create));

export default router;
