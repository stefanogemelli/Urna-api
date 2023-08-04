import Router from "express";
import { Vote } from "../controllers";
import { catchedAsync } from "../utils";
import { accessChecker } from "../middlewares/authorization";
import { voteValidation } from "../middlewares/validations";

const router = Router();

router.get("/:id", accessChecker("user"), catchedAsync(Vote.getWithResponses));

router.post("/", accessChecker("user"), voteValidation.create, catchedAsync(Vote.create));

router.patch("/:id/likes", accessChecker("user"), catchedAsync(Vote.like));

export default router;
