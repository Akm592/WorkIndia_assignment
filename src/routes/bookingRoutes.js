import express from "express";
import bookingController from "../controllers/bookingController.js";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware.js";
import bookingSchema from "../models/bookingModel.js";
import validate from "../middlewares/validator.js";

const router = express.Router();

// User routes - protected by JWT and User Role
router.post(
  "/",
  verifyToken,
  authorizeRole(["user"]),
  validate(bookingSchema),
  bookingController.bookSeat
);
router.get(
  "/:bookingId",
  verifyToken,
  authorizeRole(["user"]),
  bookingController.getBookingDetails
);

export default router;
