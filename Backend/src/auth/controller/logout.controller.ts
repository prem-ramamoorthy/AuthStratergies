import { Request, Response } from "express";
import { destroySession } from "../services/session.service.js";
import { clearSessionCookie } from "../utils/cookie.util.js";
import { deleterefreshToken } from "../jwt/jwt.store.js";

export async function sessionlogoutController(
  req: Request,
  res: Response
) {
  const sessionId = req.cookies?.session_id;

  if (sessionId) {
    await destroySession(sessionId);
    clearSessionCookie(res);
    res.status(200).json({ message: "Logged out successfully" });
    return;
  }
  res.status(204).send();
  return;
}

export async function JWTlogoutController(
  req: Request,
  res: Response
) {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required for logout" });
    }
    await deleterefreshToken(refreshToken);
    return res.status(200).json({ message: "Logged out successfully (client-side token deletion recommended)" });
  } catch (err) {
    console.error("Error during JWT logout:", err);
    return res.status(500).json({ message: "Internal server error during logout" });
  }
}