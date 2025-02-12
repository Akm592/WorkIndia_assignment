import express from "express";
import authController from "../controllers/authController.js";
import userSchema from "../models/userModel.js";
import validate from "../middlewares/validator.js";

const router = express.Router();

router.post("/register", validate(userSchema), authController.register);
router.post("/login", authController.login);

export default router;
