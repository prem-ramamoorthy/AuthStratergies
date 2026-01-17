import fetch from "node-fetch";
import { googleProvider } from "./providers/google.provider";

export async function exchangeCodeForToken(code: string)  : Promise<any> {
  const response = await fetch(googleProvider.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: googleProvider.clientId,
      client_secret: googleProvider.clientSecret,
      redirect_uri: "http://localhost:3000/auth/oauth/google/callback",
      grant_type: "authorization_code"
    })
  });
  if (!response.ok) {
    throw new Error("Failed to exchange OAuth code");
  }
  return response.json();
}

export async function fetchUserProfile(accessToken: string) : Promise<any> {
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