import Router from "express";
import { Option } from "../controllers";
import { catchedAsync } from "../utils";

import multer from "multer";
const storage = multer.memoryStorage();

const upload = multer(storage);

const router = Router();

router.post("/", upload.array("images", 20), catchedAsync(Option.create));

// router.patch("/:id", userValidation.update, catchedAsync(User.updateUser));

export default router;
