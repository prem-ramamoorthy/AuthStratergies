import { query } from "../../database/client.js";
import { Session } from "./session.model.js";

export async function createSession(
  id: string,
  userId: string,
  expiresAt: Date
): Promise<Session> {
  const rows = await query<Session>(
    `INSERT INTO sessions (id, user_id, expires_at)
     VALUES ($1, $2, $3)
     RETURNING
       id,
       user_id AS "userId",
       expires_at AS "expiresAt",
       created_at AS "createdAt"`,
    [id, userId, expiresAt]
  );

  return rows[0];
}

export async function findSessionById(
  sessionId: string
): Promise<Session | null> {
  const rows = await query<Session>(
    `SELECT
       id,
       user_id AS "userId",
       expires_at AS "expiresAt",
       created_at AS "createdAt"
     FROM sessions
     WHERE id = $1`,
    [sessionId]
  );

  return rows[0] ?? null;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await query(`DELETE FROM sessions WHERE id = $1`, [sessionId]);
}