import express from "express";
import userController from "../controllers/userController.js";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User routes - protected by JWT and User Role
router.get(
  "/me",
  verifyToken,
  authorizeRole(["user", "admin"]),
  userController.getMyDetails
);

export default router;
