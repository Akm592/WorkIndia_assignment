import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import trainRoutes from "./routes/trainRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./config/logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logger Middleware
app.use((req, res, next) => {
  logger.http(`[${req.method}] ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

// Error Handler Middleware
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("IRCTC API is running!");
});

const startServer = () => {
  console.log("Starting server...");
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
};
export default startServer;