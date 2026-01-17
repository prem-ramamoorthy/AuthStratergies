import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import JWTRoutes from "./routes/jwt.routes.js";
import oauthRoutes from "./routes/oauth.routes.js";

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173" , "https://auth-stratergies.vercel.app" , "https://auth-stratergies-mg2m.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/session", sessionRoutes);
app.use("/jwt", JWTRoutes);
app.use("/auth/oauth", oauthRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;