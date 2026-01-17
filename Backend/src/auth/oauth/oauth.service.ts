import fetch from "node-fetch";
import { googleProvider } from "./providers/google.provider.js";

export async function exchangeCodeForToken(code: string) {
  try {
    const response = await fetch(googleProvider.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: googleProvider.clientId,
        client_secret: googleProvider.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: "https://auth-stratergies-mg2m.vercel.app/auth/oauth/google/callback",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OAuth token exchange failed:", data);
      throw new Error(`OAuth error: ${JSON.stringify(data)}`);
    }

    return data;
  } catch (err) {
    console.error("Token exchange exception:", err);
    throw err;
  }
}

export async function fetchUserProfile(accessToken: string): Promise<any> {
  const response = await fetch(googleProvider.userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch OAuth profile");
  }
  return response.json();
}