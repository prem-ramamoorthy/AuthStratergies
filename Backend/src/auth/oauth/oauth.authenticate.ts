import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../jwt/jwt.tokens";

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.cookies?.access_token;
        if (!token) {
            return res.status(401).json({ error: "Unauthenticated" });
        }
        const session = verifyToken(token);
        if (!session) {
            return res.status(401).json({ error: "Invalid session" });
        }
        (req as any).userId = session.email;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Authentication failed" });
    }
}