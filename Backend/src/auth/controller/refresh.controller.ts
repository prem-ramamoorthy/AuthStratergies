import { Request, Response } from "express";
import { findrefreshTokenById, getUserdetails, updaterefreshToken } from "../jwt/jwt.store";
import { generateToken } from "../jwt/jwt.tokens";

export const JWTrefreshController = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ error: "Refresh token is required" });
        }
        const storedToken = await findrefreshTokenById(refreshToken);
        if (!storedToken) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }
        if (storedToken.expiresAt < new Date()) {
            return res.status(401).json({ error: "Refresh token has expired" });
        }
        const userid = storedToken.userId;
        const userdetails = await getUserdetails(userid);
        if (!userdetails) {
            return res.status(404).json({ error: "User not found" });
        }
        const token = generateToken(userdetails, '1m');
        const newRefreshToken = generateToken(userdetails, '7d');
        await updaterefreshToken(refreshToken, newRefreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        res.status(200).json({
            message: "Token refreshed", token: token, refreshToken: newRefreshToken
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};