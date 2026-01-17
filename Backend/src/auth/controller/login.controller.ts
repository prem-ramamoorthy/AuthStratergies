import { Request, Response } from "express";
import { deleteExistingSession, login } from "../services/auth.service.js";
import { validateLoginInput } from "../validators/login.validator.js";
import { createUserSession } from "../services/session.service.js";
import { setSessionCookie } from "../utils/cookie.util.js";
import { generateToken, generateRefreshToken } from "../jwt/jwt.tokens.js";
import { createrefreshToken } from "../jwt/jwt.store.js";

export async function loginController(
  req: Request,
  res: Response
) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }
    if (!req.body.email || !req.body.password) {
      throw new Error("Email or Password is missing");
    }
    const { email, password } = req.body;
    validateLoginInput(email, password);
    const user = await login(email, password);
    res.status(200).json({
      id: user.id,
      email: user.email
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function sessionloginController(
  req: Request,
  res: Response
) {
  const { email, password } = req.body;

  const user = await login(email, password);
  await deleteExistingSession(user.id);

  const session = await createUserSession(user.id);
  setSessionCookie(res, session.id);

  res.status(200).json({
    id: user.id,
    email: user.email
  });
}

export async function JWTloginController(
  req: Request,
  res: Response
) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }
    if (!req.body.email || !req.body.password) {
      throw new Error("Email or Password is missing");
    }
    const { email, password } = req.body;
    const user = await login(email, password);
    const newToken = generateToken(user, '1m');
    const refreshToken = generateRefreshToken(user, '7d');
    await createrefreshToken(refreshToken, user.id, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    res.status(200).json({
      id: user.id,
      email: user.email,
      token: newToken,
      refreshToken: refreshToken
    });
  }
  catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}