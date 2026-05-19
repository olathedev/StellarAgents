import express from "express";
import cors from "cors";
import helmet from "helmet";

import agentRoutes from "./routes/agents";
import taskRoutes from "./routes/tasks";
import walletRoutes from "./routes/wallet";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000" }));
app.use(express.json());

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// API routes
app.use("/api/agents", agentRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/wallet", walletRoutes);

// 404
app.use((_req, res) => res.status(404).json({ success: false, error: "Route not found" }));

// Global error handler — must be last
app.use(errorHandler);

export default app;
