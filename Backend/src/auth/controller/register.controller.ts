import { Request, Response } from "express";
import { register } from "../services/auth.service";
import { validateRegisterInput } from "../validators/register.validator";

export async function registerController(
    req: Request,
    res: Response
) {
    try {
        if (!req.body?.email || !req.body?.password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const { email, password } = req.body;
        validateRegisterInput(email, password);
        const user = await register(email, password);
        res.status(201).json({
            id: user.id,
            email: user.email
        });
    }catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}