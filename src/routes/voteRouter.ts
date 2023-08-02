import Router from "express";
import { Vote } from "../controllers";
import { catchedAsync } from "../utils";
import { accessChecker } from "../middlewares/authorization";
import { voteValidation } from "../middlewares/validations";

const router = Router();

router.post("/", accessChecker("user"), voteValidation.create, catchedAsync(Vote.create));

export default router;
