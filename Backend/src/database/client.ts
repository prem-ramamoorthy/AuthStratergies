import { Pool } from "pg";
import { env } from "../config/env";
import fs from 'fs';
import path from 'path';

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

const migrationsDir = path.join(__dirname, 'migrations');
const migrationFiles = ['001_create_users.sql', '002_sessions.sql', '003_jwt_tokens.sql', '004_oauth_accounts.sql'];

(async () => {
  try {
    for (const file of migrationFiles) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await pool.query(sql);
    }
    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  }
})();

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