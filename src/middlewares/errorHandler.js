import { logger } from "../config/logger.js";
import ApiError from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (!(err instanceof ApiError)) {
    logger.error(`Unexpected error: ${err}`);

    err = new ApiError(500, "Internal Server Error", false, err.stack);
  } else {
    logger.warn(`Operational error: ${err.message}, Status: ${err.statusCode}`);
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), 
  });
};

export { errorHandler };
