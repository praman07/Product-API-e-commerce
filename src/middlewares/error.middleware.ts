import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError.js";

// REVIEW FIX: Typed the error param and switched to console.error.
// console.log is for info; errors should go to stderr via console.error.
const errorMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorMiddleware;

