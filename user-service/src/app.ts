import express from "express";
import healthRoutes from "./routes/health.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/users", userRoutes);

// Error handling middleware
app.use(errorHandler)

export default app;