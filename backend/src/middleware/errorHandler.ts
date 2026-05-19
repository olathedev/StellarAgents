import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(422).json({
      success: false,
      error: "Validation failed",
      issues: err.errors.map((e) => ({ path: e.path.join("."), message: e.message })),
    });
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  logger.error(message, { err });
  return res.status(500).json({ success: false, error: message });
}
