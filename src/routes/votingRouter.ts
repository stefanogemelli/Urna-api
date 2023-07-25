import Router from "express";
import { Voting } from "../controllers";
import { catchedAsync } from "../utils";
import { votingValidation } from "../middlewares/validations";
import { accessRoleChecker } from "../middlewares/authorization";

const router = Router();

// recibe por query la prop "verified" = true/false
router.get("/", catchedAsync(Voting.getAll));

router.post("/", accessRoleChecker("user"), votingValidation.create, catchedAsync(Voting.create));

// router.patch("/:id", userValidation.update, catchedAsync(User.updateUser));

export default router;
