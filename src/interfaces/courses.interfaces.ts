import { QueryResult } from "pg";
import { z } from "zod";
import {
  CourseAddSchema,
  courseCreateSchema,
  courseReadSchema,
  courseSchema,
} from "../schemas";

type Courses = z.infer<typeof courseSchema>;
type CourseCreate = z.infer<typeof courseCreateSchema>;
type CourseResult = QueryResult<Courses>;
type courseRead = z.infer<typeof courseReadSchema>;

type courseAdd = z.infer<typeof CourseAddSchema>;

export { Courses, CourseCreate, CourseResult, courseRead, courseAdd };
