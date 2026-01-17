import { Router } from "express";
import { loginController } from "../auth/controller/login.controller";
import { registerController } from "../auth/controller/register.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
