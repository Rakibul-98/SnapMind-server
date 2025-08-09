// quiz.service

import { Quiz } from "./quiz.model";
import { AiService } from "../ai/ai.service";
import { TopicContent } from "../topicContent/topic.model";
import { QuizAttemptModel } from "./quizAttempt.model";
import { ProgressService } from "../progress/progress.service";
import { BadgeService } from "../badge/badge.service";

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
  answers: { questionId: string; selectedOption: string }[]
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
  const gradedAnswers = quiz.questions.map((q: any) => {
    const submitted = answers.find(
      (a) => a.questionId.toString() === q._id.toString()
    );

    const submittedAnswer = submitted?.selectedOption?.trim() || "";
    const correctAnswer = q.answer?.trim() || "";

    const isCorrect = submittedAnswer && submittedAnswer === correctAnswer;

    if (isCorrect) score++;
    return {
      questionId: q._id,
      question: q.question,
      selected: submittedAnswer,
      correct: correctAnswer,
      isCorrect,
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
    score,
    quiz.questions.length
  );
  await BadgeService.checkAndAward(userId, "quiz_completed", {
    topic: quiz.topic,
  });
  if (score === quiz?.questions?.length) {
    await BadgeService.checkAndAward(userId, "perfect_score", {
      topic: quiz.topic,
    });
  }

  return { message: "Quiz submitted", score };
};

export const QuizService = {
  getOrGenerateQuiz,
  submitQuiz,
};
