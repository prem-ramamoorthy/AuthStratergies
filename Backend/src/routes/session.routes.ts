import { Router } from "express";
import { sessionloginController } from "../auth/controller/login.controller";
import { sessionlogoutController } from "../auth/controller/logout.controller";
import { authenticate } from "../auth/middleware/authenticate.middleware";

const router = Router();

router.post("/login", sessionloginController);
router.post("/logout", sessionlogoutController);
router.get("/authenticate", authenticate , (req, res) => {
  res.status(200).json({ message: "Authenticated", userId: (req as any).userId });
});

export default router;
