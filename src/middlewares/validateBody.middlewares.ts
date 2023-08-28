import { NextFunction, Request, Response } from "express";
const validateBody =
  (schema: Zod.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);
    return next();
  };

export default validateBody;
