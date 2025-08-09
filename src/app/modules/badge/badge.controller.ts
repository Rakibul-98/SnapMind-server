import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BadgeService } from "./badge.service";
import { AuthenticatedRequest } from "../../middlewares/auth";

export const BadgeController = {
  getBadges: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!._id;
    const badges = await BadgeService.getUserBadges(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User badges retrieved successfully",
      data: badges,
    });
  }),
};
