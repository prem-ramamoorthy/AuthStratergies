import { Router } from "express";
import { oauthCallback } from "../auth/oauth/controllers/callback.controller.js";
import { oauthRedirect } from "../auth/oauth/controllers/redirect.controller.js";
import { authenticate } from "../auth/oauth/oauth.authenticate.js";
import { clearAccessTokenCookie } from "../auth/utils/cookie.util.js";

const router = Router();

router.get("/google", oauthRedirect);
router.get("/google/callback", oauthCallback);
router.get("/authenticate", authenticate, (req, res) => {
    res.status(200).json({ message: "OAuth authenticate endpoint" });
});
router.get("/logout", async (req, res) => {
    const sessionId = req.cookies?.session_id;
    if (sessionId) {
        clearAccessTokenCookie(res);
        res.status(200).json({ message: "Logged out successfully" });
        return;
    }
    res.status(204).send();
    return;
}
);

export default router;