import type { NextFunction, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/config.js";
import type { AuthentcatedRequest } from "../type/index.js";
import ApiError from "../utils/apiError.js";

export const requireAuth = (
  req: AuthentcatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "unauthorized user: no token provided");
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};
