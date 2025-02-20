import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/authMiddleware.js";
import ApiError from "../utils/apiError.js";

const registerUser = async (username, password) => {
  const existingUser = await userRepository.findUserByUsername(username);
  if (existingUser) {
    throw new ApiError(409, "Username already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser(
    username,
    hashedPassword,
    "user"
  );
  return newUser;
};

const loginUser = async (username, password) => {
  const user = await userRepository.findUserByUsername(username);
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user.id, user.role);
  return { token, user };
};

export default {
  registerUser,
  loginUser,
};
