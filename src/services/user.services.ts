import format from "pg-format";
import {
  User,
  UserCreate,
  UserRead,
  UserResult,
  UserReturn,
  UserUpdate,
} from "../interfaces";
import { client } from "../database";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userUpdateSchema,
} from "../schemas";
import { hash } from "bcryptjs";
import { AppError } from "../errors";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  payload.password = await hash(payload.password, 10);
  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserResult = await client.query(queryFormat);
  return userReturnSchema.parse(query.rows[0]);
};

const read = async (): Promise<UserRead> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  return userReadSchema.parse(query.rows);
};

const partialUpdate = async (
  userId: string,
  payload: UserUpdate
): Promise<UserReturn> => {
  if (payload.password) {
    payload.password = await hash(payload.password, 10);
  }

  const queryFormat: string = format(
    'UPDATE "users" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserResult = await client.query(queryFormat, [userId]);
  return userReturnSchema.parse(query.rows[0]);
};

const destroy = async (userId: string): Promise<void> => {
  await client.query('DELETE FROM "users" WHERE "id" = $1;', [userId]);
};

const getUserService = async (userId: string) => {
  const queryString: string = `
  SELECT 
  c.id "courseId",
  c.name "courseName",
  c.description  "courseDescription",
  uc.active "userActiveInCourse",
  u.id "userId",
  u.name "userName"
FROM courses c 
JOIN "userCourses" uc ON c.id = uc."courseId" 
JOIN  users u 
  ON u.id = uc."userId" 
WHERE u.id = $1;`;

  const queryResult = await client.query(queryString, [userId]);
  if (queryResult.rowCount === 0) {
    throw new AppError("No course found", 404);
  }
  return queryResult.rows;
};

export default { create, read, partialUpdate, destroy, getUserService };
