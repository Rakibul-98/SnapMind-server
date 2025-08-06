// ai.controller.ts
import { Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AiService } from "./ai.service";
import { AuthenticatedRequest } from "../../middlewares/auth";

export const generateCourseOutline = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const { prompt, model } = req.body;
    const userId = req.user!._id;

    const outline = await AiService.generateCourseOutline(
      prompt,
      userId,
      model
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course outline generated successfully",
      data: { outline },
    });
  }
);
