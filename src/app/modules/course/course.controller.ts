import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";
import { AuthenticatedRequest } from "../../middlewares/auth";

const createCourse = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!._id;
    const result = await courseServices.createCourse(userId, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course created with outline",
      data: result,
    });
  }
);

const getMyCourses = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!._id;
    const result = await courseServices.getMyCourses(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "My courses fetched",
      data: result,
    });
  }
);

const getCourseById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!._id;

    const result = await courseServices.getCourseById(id, userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course fetched",
      data: result,
    });
  }
);

const completeCourse = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!._id;

    const result = await courseServices.completeCourse(id, userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course marked as completed",
      data: result,
    });
  }
);

export const courseControllers = {
  createCourse,
  getMyCourses,
  getCourseById,
  completeCourse,
};
