import { Router } from "express";
import userRouter from "./userRouter";
import regionRouter from "./regionRouter";

const router = Router();

router.use("/users", userRouter);

// Ruta para admins para gestionar las regiones //
router.use("/regions", regionRouter);
// --------------------------------------------- //

export default router;
