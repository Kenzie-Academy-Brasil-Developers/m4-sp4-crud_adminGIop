import { Request, Response } from "express";
import { courseRead, Courses, CourseCreate } from "../interfaces/index";
import { coursesServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const courses: Array<Courses> = await coursesServices.create(req.body);
  return res.status(201).json(courses);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const course: courseRead = await coursesServices.read();
  return res.status(200).json(course);
};

const addCourse = async (req: Request, res: Response): Promise<Response> => {
  const userId: string = req.params.userId;
  const courseId: string = req.params.courseId;
  await coursesServices.addCourse(courseId, userId);
  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

const deleteCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.userId;
  const courseId: string = req.params.courseId;
  await coursesServices.deleteCourseService(courseId, userId);
  return res.status(204).json();
};

const listCourseDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userCourses = await coursesServices.getCourseService(
    req.params.courseId
  );

  return res.status(200).json(userCourses);
};

export default {
  create,
  read,
  addCourse,
  deleteCourseController,
  listCourseDeveloper,
};
