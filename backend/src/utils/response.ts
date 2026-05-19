import { Response } from "express";

export const ok = <T>(res: Response, data: T, status = 200) =>
  res.status(status).json({ success: true, data });

export const created = <T>(res: Response, data: T) => ok(res, data, 201);

export const fail = (res: Response, message: string, status = 400) =>
  res.status(status).json({ success: false, error: message });

export const notFound = (res: Response, resource = "Resource") =>
  fail(res, `${resource} not found`, 404);

export const serverError = (res: Response, err: unknown) => {
  const message = err instanceof Error ? err.message : "Internal server error";
  return fail(res, message, 500);
};
