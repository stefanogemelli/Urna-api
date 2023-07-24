import Router from "express";
import { User } from "../controllers";
import { catchedAsync } from "../utils";
import { userValidation } from "../middlewares/validations";

const router = Router();

router.get("/", catchedAsync(User.getUsers));

router.post("/", userValidation.register, catchedAsync(User.createUser));

// LAS DE ABAJO TODAVIA NO LAS TESTIÉ

// hay que averiguar si queremos guardar el id en front para enviarlo en esta peticion o usamos
// el email que viene por body nomás para el update
router.patch("/", userValidation.update, catchedAsync(User.updateUser));

export default router;
