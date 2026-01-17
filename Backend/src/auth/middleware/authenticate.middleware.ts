import { Request, Response, NextFunction } from "express";
import { validateSession } from "../services/session.service";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = req.cookies?.session_id;

  if (!sessionId) {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  const session = await validateSession(sessionId);

  if (!session) {
    return res.status(401).json({ error: "Invalid session" });
  }

  (req as any).userId = session.userId;
  next();
}
