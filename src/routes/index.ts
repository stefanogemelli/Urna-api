import { Router } from "express";
import userRouter from "./userRouter";
import regionsRouter from "./regionsRouter";

const router = Router();

router.use("/users", userRouter);

// Ruta para admins para gestionar las regiones //
router.use("/regions", regionsRouter);
// --------------------------------------------- //

export default router;
