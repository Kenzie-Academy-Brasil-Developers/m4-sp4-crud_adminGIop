import { z } from "zod";

const courseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15).nonempty(),
  description: z.string().nonempty(),
});

const courseCreateSchema = courseSchema.omit({ id: true }).array().min(1);
const courseUpdateSchema = courseSchema.partial();
const courseReadSchema = courseSchema.array();

const CourseAddSchema = z.object({
  userId: z.number().positive(),
  courseId: z.number().positive(),
});

export {
  courseSchema,
  courseCreateSchema,
  courseUpdateSchema,
  courseReadSchema,
  CourseAddSchema,
};
