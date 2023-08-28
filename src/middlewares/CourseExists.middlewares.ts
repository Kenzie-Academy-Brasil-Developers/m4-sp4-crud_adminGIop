import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const courseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  const queryString: string = `SELECT * FROM "courses" WHERE "id" = $1`;

  const query: UserResult = await client.query(queryString, [userId]);

  if (query.rowCount === 0) {
    throw new AppError("No course found", 404);
  }

  res.locals = { ...res.locals, foundUser: query.rows[0] };

  return next();
};

export default courseExists;
