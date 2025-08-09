import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LeaderboardService } from "./leaderboard.service";

export const LeaderboardController = {
  getLeaderboard: catchAsync(async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const leaderboard = await LeaderboardService.getLeaderboard(limit, skip);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Leaderboard retrieved successfully",
      data: {
        page,
        limit,
        leaderboard,
      },
    });
  }),
};
