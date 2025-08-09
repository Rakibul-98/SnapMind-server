import { AppError } from "../../errors/AppError";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";
import { AiService } from "../ai/ai.service";
import { User } from "../user/user.model";

interface FlattenedOutline {
  topics: string[];
}

const flattenOutline = (aiOutline: any): FlattenedOutline => {
  const topics: string[] = [];

  if (!aiOutline?.modules || !Array.isArray(aiOutline.modules)) {
    return { topics };
  }

  aiOutline.modules.forEach((mod: any) => {
    if (mod.title) topics.push(mod.title);
  });

  return { topics: topics.slice(0, 10) };
};

const createCourse = async (
  userId: string,
  payload: { title: string; description?: string }
): Promise<ICourse> => {
  try {
    const existingCourse = await Course.findOne({
      user: userId,
      title: { $regex: new RegExp(`^${payload.title}$`, "i") },
    });

    if (existingCourse) {
      return existingCourse;
    }

    const activeCoursesCount = await Course.countDocuments({
      user: userId,
      isCompleted: false,
    });
    if (activeCoursesCount >= 3) {
      throw new AppError(
        "You already have 3 active courses. Complete one to start a new one.",
        400
      );
    }

    const aiOutline = await AiService.generateCourseOutline(
      payload.title,
      userId
    );

    const { topics } = flattenOutline(aiOutline);

    const newCourse = await Course.create({
      ...payload,
      user: userId,
      outline: topics,
    });

    await User.findByIdAndUpdate(userId, { $inc: { activeCourses: 1 } });

    return newCourse;
  } catch (error: any) {
    throw new AppError(error.message || "Course creation failed", 500);
  }
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

const completeCourse = async (id: string, userId: string) => {
  const course = await Course.findOneAndUpdate(
    { _id: id, user: userId },
    { isCompleted: true },
    { new: true }
  );
  if (!course) throw new AppError("Course not found", 404);

  await User.findByIdAndUpdate(userId, { $inc: { activeCourses: -1 } });

  return course;
};

export const courseServices = {
  getCourseById,
  getMyCourses,
  createCourse,
  completeCourse,
};
