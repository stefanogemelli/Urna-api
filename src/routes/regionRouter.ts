import Router from "express";
import { Region } from "../controllers";
import { catchedAsync } from "../utils";
import { regionValidation } from "../middlewares/validations";

const router = Router();

router.get("/", catchedAsync(Region.getRegions));

router.post("/", regionValidation.create, catchedAsync(Region.createRegion));

export default router;
