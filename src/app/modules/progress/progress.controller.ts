import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthenticatedRequest } from "../../middlewares/auth";
import { ProgressService } from "./progress.service";

export const ProgressController = {
  getProgress: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!._id;
    const { courseId } = req.params;

    const data = await ProgressService.getProgress(userId, courseId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Progress retrieved successfully",
      data,
    });
  }),
};
