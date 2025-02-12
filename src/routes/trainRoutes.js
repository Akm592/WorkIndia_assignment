import express from "express";
import trainController from "../controllers/trainController.js";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware.js";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware.js";
import { trainSchema, updateTrainSchema } from "../models/trainModel.js";
import validate from "../middlewares/validator.js";

const router = express.Router();

// Admin routes - protected by API Key and Admin Role
router.post(
  "/",
  apiKeyMiddleware,
  validate(trainSchema),
  trainController.addTrain
);
router.put(
  "/:trainId/seats",
  apiKeyMiddleware,
  validate(updateTrainSchema),
  trainController.updateSeats
);

// User routes - protected by JWT and User/Admin Role (for viewing availability)
router.get(
  "/availability",
  verifyToken,
  authorizeRole(["user", "admin"]),
  trainController.getAvailability
);

export default router;
