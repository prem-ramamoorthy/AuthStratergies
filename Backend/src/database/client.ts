import { Pool } from "pg";
import { env } from "../config/env";

export const pool = new Pool({
  connectionString: env.DATABASE_URL
});

pool.on("connect", (client) => {
  console.log("Connected to database:", client.database);
});

export async function query<U = any>(
  text: string,
  params?: unknown[]
): Promise<U[]> {
  const res = await pool.query(text, params);
  return res.rows;
}