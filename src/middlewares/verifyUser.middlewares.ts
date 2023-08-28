import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";

const verifyUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  const { sub, admin } = res.locals.decoded;

  if (admin) return next();

  if (userId !== sub) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default verifyUser;
