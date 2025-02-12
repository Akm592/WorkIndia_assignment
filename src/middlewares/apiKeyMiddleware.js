import dotenv from "dotenv";
dotenv.config();

const adminApiKey = process.env.ADMIN_API_KEY;

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== adminApiKey) {
    return res.status(401).json({ message: "Unauthorized: Invalid API Key" });
  }
  next();
};

export { apiKeyMiddleware };
