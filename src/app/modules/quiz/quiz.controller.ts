// quiz. controller

import { AuthenticatedRequest } from "../../middlewares/auth";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { QuizService } from "./quiz.service";

export const QuizController = {
  getQuizByTopic: catchAsync(async (req: AuthenticatedRequest, res) => {
    const userId = req.user!._id;
    const { courseId, topic } = req.body;

    if (!courseId || !topic) {
      return res.status(400).json({ error: "Missing courseId or topic" });
    }

    const quiz = await QuizService.getOrGenerateQuiz(userId, courseId, topic);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz retrieved successfully",
      data: quiz,
    });
  }),
};
