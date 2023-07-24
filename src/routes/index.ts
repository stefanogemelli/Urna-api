import { Router } from "express";
import userRouter from "./userRouter";
import regionRouter from "./regionRouter";
import votingRouter from "./votingRouter";
import authenticationRouter from "./authenticationRouter";

const router = Router();

router.use("/auth", authenticationRouter);

router.use("/users", userRouter);

// Ruta para admins para gestionar las regiones //
router.use("/regions", regionRouter);
// --------------------------------------------- //

router.use("/voting", votingRouter);

export default router;
