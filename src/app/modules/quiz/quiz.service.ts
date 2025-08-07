// quiz.service

import { Quiz } from "./quiz.model";
import { AiService } from "../ai/ai.service";
import { TopicContent } from "../topicContent/topic.model";
import { QuizAttemptModel } from "./quizAttempt.model";
import { ProgressService } from "../progress/progress.service";

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

const submitQuiz = async (
  userId: string,
  quizId: string,
  answers: { question: string; selected: string }[]
) => {
  const existing = await QuizAttemptModel.findOne({
    user: userId,
    quiz: quizId,
  });
  if (existing) {
    return { message: "Already attempted", score: existing.score };
  }

  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error("Quiz not found");

  let score = 0;
  const gradedAnswers = quiz.questions.map((q: any, idx: number) => {
    const submitted = answers.find((a) => a.question === q.question);
    const isCorrect = submitted && submitted.selected === q.answer;
    if (isCorrect) score++;
    return {
      question: q.question,
      selected: submitted?.selected || "",
      correct: q.answer,
    };
  });

  await QuizAttemptModel.create({
    user: userId,
    quiz: quizId,
    score,
    answers: gradedAnswers,
  });
  await ProgressService.updateProgress(
    userId,
    quiz.course.toString(),
    quiz.topic,
    score
  );
  return { message: "Quiz submitted", score };
};

export const QuizService = {
  getOrGenerateQuiz,
  submitQuiz,
};
