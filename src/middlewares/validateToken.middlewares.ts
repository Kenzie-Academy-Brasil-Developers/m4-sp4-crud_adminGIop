import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors";

const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token: string = authorization.split(" ")[1];
  const decoded = verify(token, process.env.SECRET_KEY!);

  res.locals = { ...res.locals, decoded };

  return next();
};

export default validateToken;
