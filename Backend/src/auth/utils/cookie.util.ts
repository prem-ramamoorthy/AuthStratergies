import { Response } from "express";
import { env } from "../../config/env.js";

export function setSessionCookie(
  res: Response,
  sessionId: string
) {
  res.cookie("session_id", sessionId, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    maxAge: env.SESSION_DURATION_SECONDS * 1000,
    path: "/"
  });
}

export function clearSessionCookie(res: Response) {
  res.clearCookie("session_id");
}

export function clearAccessTokenCookie(res: Response) {
  res.clearCookie("access_token");
}