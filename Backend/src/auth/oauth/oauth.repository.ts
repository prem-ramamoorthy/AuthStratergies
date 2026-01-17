import { query } from "../../database/client.js";
import crypto from "crypto";

export async function linkOAuthAccount(
    userId: string,
    provider: string,
    providerUserId: string
) {
    await query(`
    INSERT INTO oauth_accounts (
      id,
      user_id,
      provider,
      provider_user_id
    )
    VALUES ($1,$2,$3,$4)
    ON CONFLICT (provider, provider_user_id) DO NOTHING
  `, [
        crypto.randomUUID(),
        userId,
        provider,
        providerUserId
    ]);
}
