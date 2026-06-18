import type { NextFunction, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/config.js";
import type { AuthenticatedRequest } from "../type/index.js";
import ApiError from "../utils/apiError.js";

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.accessToken;

  // REVIEW FIX: Use next() instead of throw so the global error middleware handles it.
  // Throwing directly in a non-async middleware skips errorMiddleware entirely.
  if (!token) {
    return next(new ApiError(401, "unauthorized user: no token provided"));
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    next(new ApiError(401, "unauthorized user: invalid or expired token"));
  }
};
