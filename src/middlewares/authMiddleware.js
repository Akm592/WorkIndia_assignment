import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import supabase from "../config/database.js";
import ApiError from "../utils/apiError.js";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, jwtSecret, { expiresIn: "1h" }); // Token expires in 1 hour
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Unauthorized: Token required"));
  }

  jwt.verify(token, jwtSecret, async (err, user) => {
    if (err) {
      return next(new ApiError(403, "Forbidden: Invalid token"));
    }
    req.user = user; // Attach user info to request
    next();
  });
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden: Insufficient permissions"));
    }
    next();
  };
};

export { generateToken, verifyToken, authorizeRole };
