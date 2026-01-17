import { Request, Response } from "express";
import crypto from "crypto";
import { googleProvider } from "../providers/google.provider.js";

export function oauthRedirect(req: Request, res: Response) {
  const state = crypto.randomBytes(16).toString("hex");

  res.cookie("oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 10 * 60 * 1000,
    path: "/",
  });

  const params = new URLSearchParams({
    client_id: googleProvider.clientId,
    redirect_uri: "https://auth-stratergies-mg2m.vercel.app/auth/oauth/google/callback",
    response_type: "code",
    scope: googleProvider.scopes.join(" "),
    state
  });

  res.redirect(`${googleProvider.authorizeUrl}?${params.toString()}`);
}