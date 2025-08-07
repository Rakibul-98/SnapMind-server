// quiz.service

import { Quiz } from "./quiz.model";
import { AiService } from "../ai/ai.service";
import { TopicContent } from "../topicContent/topic.model";

const getOrGenerateQuiz = async (
  userId: string,
  courseId: string,
  topic: string
) => {
  const existing = await Quiz.findOne({
    user: userId,
    course: courseId,
    topic,
  });
  if (existing) return existing;

  const topicContent = await TopicContent.findOne({
    user: userId,
    course: courseId,
    topic,
  });
  if (!topicContent) throw new Error("Topic content not found");

  const questions = await AiService.generateQuizFromContent(
    topicContent.content
  );

  const quiz = await Quiz.create({
    user: userId,
    course: courseId,
    topic,
    questions,
  });

  return quiz;
};

export const QuizService = {
  getOrGenerateQuiz,
};
