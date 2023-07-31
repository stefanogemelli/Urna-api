import Router from "express";
import { Voting } from "../controllers";
import { catchedAsync } from "../utils";
import { votingValidation } from "../middlewares/validations";
import { accessRoleChecker } from "../middlewares/authorization";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer(storage);

const router = Router();

// recibe por query la prop "verified" = true/false
router.get("/", catchedAsync(Voting.getAll));

router.get("/titles", catchedAsync(Voting.getTitles));

router.get("/:id", catchedAsync(Voting.getById));

router.post("/", upload.any(), catchedAsync(Voting.create));

// router.patch("/:id", userValidation.update, catchedAsync(User.updateUser));

export default router;
