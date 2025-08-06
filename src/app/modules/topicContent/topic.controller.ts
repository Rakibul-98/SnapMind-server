import { AuthenticatedRequest } from "../../middlewares/auth";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { topicContentService } from "./topic.service";

export const TopicContentController = {
  getContentByTopic: catchAsync(async (req: AuthenticatedRequest, res) => {
    const userId = req.user!._id;
    const { courseId, topicTitle } = req.body;

    if (!courseId || !topicTitle) {
      return res.status(400).json({ error: "Missing courseId or topicTitle" });
    }

    const content = await topicContentService.getOrGenerateTopicContent(
      userId,
      courseId,
      topicTitle
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Topic content retrieved successfully",
      data: { content },
    });
  }),
};
