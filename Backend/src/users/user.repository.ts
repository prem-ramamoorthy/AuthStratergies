import { query } from "../database/client.js";
import { User } from "./user.model.js";
import { v4 as uuidv4 } from "uuid";

export async function findUserByEmail(
  email: string
): Promise<User | null> {
  const rows = await query<User>(
    `SELECT 
       id,
       email,
       password_hash AS "passwordHash",
       is_active AS "isActive",
       created_at AS "createdAt"
     FROM users
     WHERE email = $1`,
    [email]
  );

  return rows[0] ?? null;
}

export async function createUser(
  email: string,
  passwordHash: string
): Promise<User> {
  const id = uuidv4();

  const rows = await query<User>(
    `INSERT INTO users (id, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING
       id,
       email,
       password_hash AS "passwordHash",
       is_active AS "isActive",
       created_at AS "createdAt"`,
    [id, email, passwordHash]
  );

  return rows[0];
}

export async function deactivateSessionsByUserId(
  userId: string
): Promise<User | null> {
  const rows = await query<User>(
    `DELETE FROM sessions WHERE user_id = $1`,
    [userId]
  );

  return rows[0] ?? null;
}