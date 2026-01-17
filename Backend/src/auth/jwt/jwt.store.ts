import { query } from "../../database/client";
import { createHash, randomUUID } from "crypto";
import { refreshToken } from "./jwt.model";
import { User } from "../../users/user.model";

export async function createrefreshToken(
    token: string,
    userId: string,
    expiresAt: Date
): Promise<refreshToken> {
    const id = randomUUID();
    const rows = await query<refreshToken>(
        `INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at)
         VALUES ($1, $2, $3, $4)
         RETURNING
             id,
             user_id AS "userId",
             token_hash AS "tokenHash",
             expires_at AS "expiresAt",
             revoked,
             created_at AS "createdAt"`,
        [id, userId, token, expiresAt]
    );
    return rows[0];
}

export async function findrefreshTokenById(
    refreshTokenId: string
): Promise<refreshToken | null> {
    const rows = await query<refreshToken>(
        `SELECT
             id,
             user_id AS "userId",
             token_hash AS "tokenHash",
             expires_at AS "expiresAt",
             revoked,
             created_at AS "createdAt"
         FROM refresh_tokens
         WHERE token_hash = $1`,
        [refreshTokenId]
    );

    return rows[0] ?? null;
}

export async function updaterefreshToken(refreshTokenId : string , newRefreshTokenHash : string, newExpiryDate : Date) : Promise< string | null> {
    await query(
        `UPDATE refresh_tokens
         SET token_hash = $1,
             expires_at = $2
         WHERE token_hash = $3`,
        [newRefreshTokenHash, newExpiryDate, refreshTokenId]
    );
    return newRefreshTokenHash;
}

export async function deleterefreshToken(refreshTokenId: string): Promise<void> {
    await query(`DELETE FROM refresh_tokens WHERE token_hash = $1`, [refreshTokenId]);
}

export async function getUserdetails(userId: string): Promise<User | null> {
    const rows = await query<User>(`SELECT * FROM users WHERE id = $1`, [userId]);
    return rows[0] ?? null;
}