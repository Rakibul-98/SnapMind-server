import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "../user/user.service";
import { ProgressService } from "../progress/progress.service";
import { PointsService } from "../gamification/gamification.service";
import { BadgeService } from "../badge/badge.service";
import { LeaderboardService } from "../leaderboard/leaderboard.service";
import { courseServices } from "../course/course.service";

export const AdminController = {
  getAllUsers: catchAsync(async (req, res) => {
    const users = await userServices.getAllUsers();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All users retrieved",
      data: users,
    });
  }),

  getUserCourses: catchAsync(async (req, res) => {
    const { userId } = req.params;
    const courses = await courseServices.getMyCourses(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User courses retrieved successfully",
      data: courses,
    });
  }),

  getUserProgress: catchAsync(async (req, res) => {
    const { userId, courseId } = req.params;
    const progress = await ProgressService.getProgress(userId, courseId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User progress retrieved",
      data: progress,
    });
  }),

  getUserPoints: catchAsync(async (req, res) => {
    const { userId } = req.params;
    const points = await PointsService.getPointsByUser(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User points retrieved",
      data: points,
    });
  }),

  getUserBadges: catchAsync(async (req, res) => {
    const { userId } = req.params;
    const badges = await BadgeService.getUserBadges(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User badges retrieved",
      data: badges,
    });
  }),

  getLeaderboard: catchAsync(async (req, res) => {
    const leaderboard = await LeaderboardService.getLeaderboard();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Leaderboard retrieved",
      data: leaderboard,
    });
  }),
};
