import { AppError } from "../../errors/AppError";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";

const generateOutline = async (title: string): Promise<string[]> => {
  return [
    `${title} - Topic 1`,
    `${title} - Topic 2`,
    `${title} - Topic 3`,
    `${title} - Topic 4`,
  ].slice(0, 10);
};

const createCourse = async (
  userId: string,
  payload: { title: string; description?: string }
): Promise<ICourse> => {
  const outline = await generateOutline(payload.title);
  const newCourse = await Course.create({
    ...payload,
    user: userId,
    outline,
  });
  return newCourse;
};

const getMyCourses = async (userId: string): Promise<ICourse[]> => {
  return Course.find({ user: userId }).sort({ createdAt: -1 });
};

const getCourseById = async (
  id: string,
  userId: string
): Promise<ICourse | null> => {
  const course = await Course.findOne({ _id: id, user: userId });
  if (!course) throw new AppError("Course not found", 404);
  return course;
};

export const courseServices = {
  getCourseById,
  getMyCourses,
  createCourse,
};
