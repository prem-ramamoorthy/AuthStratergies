import { Request, Response } from "express";
import crypto from "crypto";
import {
    exchangeCodeForToken,
    fetchUserProfile
} from "../oauth.service.js";
import { generateToken } from "../../jwt/jwt.tokens.js";
import { findUserByEmail, createUser } from "../../../users/user.repository.js";
import { linkOAuthAccount } from "../oauth.repository.js";
import { env } from "../../../config/env.js";

interface TokenResponse {
    access_token: string;
}

export async function oauthCallback(
    req: Request,
    res: Response
) {
    const { code, state } = req.query as {
        code?: string;
        state?: string;
    };

    if (!code || !state) {
        return res.redirect("https://auth-stratergies.vercel.app/");
    }
    if (state !== req.cookies["oauth_state"]) {
        return res.redirect("https://auth-stratergies.vercel.app/");
    }
    const tokenResponse: TokenResponse = await exchangeCodeForToken(code) as TokenResponse;
    const profile = await fetchUserProfile(tokenResponse.access_token as string);
    let user = await findUserByEmail(profile.email as string);
    if (!user) {
        user = await createUser(profile.email as string, "");
    }
    await linkOAuthAccount(
        user.id,
        "google",
        profile.sub
    );
    const accessToken = generateToken(
        { sub: user.id, auth: "oauth" },
        60 * 15
    );
    res.clearCookie("oauth_state");
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        maxAge: env.SESSION_DURATION_SECONDS * 1000,
        path: "/",
        domain: "https://auth-stratergies.vercel.app"
    });
    res.redirect(
        `https://auth-stratergies.vercel.app/dashboard`
    );
    return
}