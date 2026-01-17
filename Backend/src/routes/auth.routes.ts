import { Router } from "express";
import { loginController } from "../auth/controller/login.controller.js";
import { registerController } from "../auth/controller/register.controller.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
