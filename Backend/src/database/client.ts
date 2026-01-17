import { Pool } from "pg";
import { env } from "../config/env.js";

const pool = new Pool({
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on("connect", (client) => {
  console.log("Connected to database:", (client as any).database);
});

pool.on("connect", (client) => {
  console.log("Connected to database:", (client as any).database);
});

export async function query<U = any>(
  text: string,
  params?: unknown[]
): Promise<U[]> {
  const res = await pool.query(text, params);
  return res.rows;
}