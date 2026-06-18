import type { Request } from "express";

// REVIEW FIX: Renamed typo AuthentcatedRequest → AuthenticatedRequest
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}
