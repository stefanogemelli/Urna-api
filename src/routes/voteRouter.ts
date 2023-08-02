import Router from "express";
import { Vote } from "../controllers";
import { catchedAsync } from "../utils";
import { votingValidation } from "../middlewares/validations";
import { accessChecker } from "../middlewares/authorization";

const router = Router();

router.post("/", accessChecker("user"), catchedAsync(Vote.create));

export default router;
