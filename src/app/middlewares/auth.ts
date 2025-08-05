import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import httpStatus from "http-status";
import { config } from "../config";

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

export const auth = (allowedRoles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(
          "Unauthorized: No token provided",
          httpStatus.UNAUTHORIZED
        );
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

      if (!decoded || typeof decoded !== "object") {
        throw new AppError(
          "Unauthorized: Invalid token",
          httpStatus.UNAUTHORIZED
        );
      }

      const { _id, role } = decoded;

      if (!allowedRoles.includes(role)) {
        throw new AppError("Forbidden: Access denied", httpStatus.FORBIDDEN);
      }

      (req as AuthenticatedRequest).user = { _id, role };
      next();
    } catch (err) {
      next(err);
    }
  };
};
