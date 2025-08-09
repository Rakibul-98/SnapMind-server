// topic.service

import { AiService } from "../ai/ai.service";
import { Course } from "../course/course.model";
import { TopicContent } from "./topic.model";

const getOrGenerateTopicContent = async (
  userId: string,
  courseId: string,
  topicTitle: string
): Promise<string> => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  const existing = await TopicContent.findOne({
    user: userId,
    course: courseId,
    topic: topicTitle,
  });

  if (existing || course.isCompleted) {
    return existing ? existing.content : "";
  }

  const prompt = `Explain the topic "${topicTitle}" in detail. Provide relevant real-world applications and examples. Pull insights from popular sources or documentation.`;

  const content = await AiService.generateTopicContent(prompt);

  await TopicContent.create({
    user: userId,
    course: courseId,
    topic: topicTitle,
    content,
  });

  return content;
};

export const topicContentService = {
  getOrGenerateTopicContent,
};
