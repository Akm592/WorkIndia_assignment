import authService from "../services/authService.js";
import userSchema from "../models/userModel.js";
import validate from "../middlewares/validator.js";

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.registerUser(username, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { token, user } = await authService.loginUser(username, password);
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
