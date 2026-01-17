import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "",
  SESSION_DURATION_SECONDS: Number(process.env.SESSION_DURATION_SECONDS) / (60 * 60 * 24) || 7, // SECONDS to DAYS,
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || ""
};