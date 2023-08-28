import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";

const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals.decoded;

  if (!admin) throw new AppError("Insufficient permission", 403);
  return next();
};

export default validateAdmin;
