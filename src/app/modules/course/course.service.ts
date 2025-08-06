import { AppError } from "../../errors/AppError";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";
import { AiService } from "../ai/ai.service";

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
    if (Array.isArray(mod.lessons)) {
      mod.lessons.forEach((lesson: any) => {
        if (lesson.title) topics.push(`  - ${lesson.title}`);
      });
    }
  });

  return { topics: topics.slice(0, 8) };
};

const createCourse = async (
  userId: string,
  payload: { title: string; description?: string }
): Promise<ICourse> => {
  try {
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

export const courseServices = {
  getCourseById,
  getMyCourses,
  createCourse,
};
