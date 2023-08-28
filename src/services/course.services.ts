import format from "pg-format";
import { client } from "../database";
import { CourseCreate, courseRead, CourseResult, Courses } from "../interfaces";
import { courseReadSchema } from "../schemas";

const create = async (payload: CourseCreate): Promise<Array<Courses>> => {
  const columns = Array.from(new Set(payload.flatMap((el) => Object.keys(el))));

  const values = payload.map((course) => {
    const newObj: any = {};

    for (const column of columns) {
      newObj[column] = course[column as keyof Omit<Courses, "id">] || null;
    }
    return Object.values(newObj);
  });

  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES %L RETURNING *',
    columns,
    values
  );

  const query: CourseResult = await client.query(queryFormat);
  return query.rows;
};

const read = async (): Promise<courseRead> => {
  const query: CourseResult = await client.query('SELECT * FROM "courses";');
  return courseReadSchema.parse(query.rows);
};

const addCourse = async (courseId: string, userId: string): Promise<void> => {
  const queryString: string =
    'INSERT INTO "userCourses" ("userId" , "courseId") VALUES ($1,$2);';

  await client.query(queryString, [courseId, userId]);
};

const deleteCourseService = async (
  courseId: string,
  userId: string
): Promise<void> => {
  const queryString: string = `UPDATE "userCourses" SET active = false  WHERE "courseId" = $1 AND "userId" = $2 ;`;
  await client.query(queryString, [courseId, userId]);
};

const getCourseService = async (courseId: string) => {
  const queryString: string = `SELECT
      u.id "userId",
      u.name "userName",
      u.email "userEmail",
      c.id "courseId",
      c.name "courseName",
      c.description "courseDescription",
      uc.active "userActiveInCourse"
    FROM users u 
    JOIN "userCourses" uc ON u.id = uc."userId" 
    JOIN  courses c
        ON c.id = uc."courseId"
    WHERE c.id = $1;`;

  const queryResult = await client.query(queryString, [courseId]);

  return queryResult.rows;
};

export default {
  create,
  read,
  addCourse,
  deleteCourseService,
  getCourseService,
};
