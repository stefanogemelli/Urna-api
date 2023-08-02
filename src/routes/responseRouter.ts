import Router from "express";
import { Response } from "../controllers";
import { catchedAsync } from "../utils";
import { accessChecker } from "../middlewares/authorization";
import { voteValidation } from "../middlewares/validations";

const router = Router();

router.post("/", accessChecker("user"), catchedAsync(Response.create));
router.get("/vote/:id", accessChecker("user"), catchedAsync(Response.getByVoteId));

export default router;
