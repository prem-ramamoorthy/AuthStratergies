import { Router } from "express";
import { JWTloginController } from "../auth/controller/login.controller";
import { authenticate } from "../auth/middleware/jwt.auth.middleware";
import { JWTrefreshController } from "../auth/controller/refresh.controller";
import { JWTlogoutController } from "../auth/controller/logout.controller";

const router = Router();

router.post("/login", JWTloginController);
router.post("/refresh", JWTrefreshController);
router.post("/logout", JWTlogoutController);
router.get("/authenticate", authenticate , (req, res) => {
  res.status(200).json({ message: "Authenticated", user: (req as any).user });
});

export default router;