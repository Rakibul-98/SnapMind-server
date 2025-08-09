// progress.service

import { config } from "../../config";
import { BadgeService } from "../badge/badge.service";
import { Course } from "../course/course.model";
import { PointsService } from "../gamification/gamification.service";
import { ProgressModel } from "./progress.model";

const updateProgress = async (
  userId: string,
  courseId: string,
  topic: string,
  score: number,
  totalQuestions: number
) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  let progress = await ProgressModel.findOne({
    user: userId,
    course: courseId,
  });

  const quizPoints = score * config.quizPoint;
  const isPerfectScore = score === totalQuestions;

  if (!progress) {
    // First time progress creation for user & course
    progress = await ProgressModel.create({
      user: userId,
      course: courseId,
      completedTopics: [topic],
      quizScores: [{ topic, score }],
      totalScore:
        quizPoints +
        config.topicPoint +
        (isPerfectScore ? config.perfectScoreBonus : 0),
      totalTopics: 1,
    });

    // Award points for quiz, topic completion, and perfect score bonus (if any)
    await PointsService.addPoints(
      userId,
      quizPoints,
      "quiz",
      `Completed quiz for topic "${topic}"`
    );
    await PointsService.addPoints(
      userId,
      config.topicPoint,
      "course",
      `Completed topic "${topic}"`
    );
    if (isPerfectScore) {
      await PointsService.addPoints(
        userId,
        config.perfectScoreBonus,
        "bonus",
        `You hit all correct quiz on "${topic}"`
      );
    }
  } else {
    // Check if topic already completed to avoid double awarding
    const alreadyCompleted = progress.completedTopics.includes(topic);

    if (!alreadyCompleted) {
      progress.completedTopics.push(topic);
      progress.quizScores.push({ topic, score });
      progress.totalTopics = progress.completedTopics.length;

      // Recalculate total quiz points so far
      const totalQuizPoints = progress.quizScores.reduce(
        (sum, qs) => sum + qs.score! * config.quizPoint,
        0
      );

      // Calculate total points including topic completion and perfect score bonuses for all completed topics
      // totalTopicCompletionPoints = number of completed topics * topicPoint
      // totalPerfectScoreBonuses = sum of perfect score bonuses for topics with perfect score
      const totalPerfectScoreBonuses = progress.quizScores.reduce(
        (sum, qs) =>
          sum + (qs.score === totalQuestions ? config.perfectScoreBonus : 0),
        0
      );
      const totalTopicCompletionPoints =
        progress.completedTopics.length * config.topicPoint;

      progress.totalScore =
        totalQuizPoints + totalTopicCompletionPoints + totalPerfectScoreBonuses;

      await progress.save();

      // Award points for this submission
      await PointsService.addPoints(
        userId,
        quizPoints,
        "quiz",
        `Completed quiz for topic "${topic}"`
      );
      await PointsService.addPoints(
        userId,
        config.topicPoint,
        "bonus",
        `Completed topic "${topic}"`
      );
      if (isPerfectScore) {
        await PointsService.addPoints(
          userId,
          config.perfectScoreBonus,
          "bonus",
          `Perfect score in topic "${topic}"`
        );
      }

      // If user completed all topics in course, award course completion points and badge
      if (progress.totalTopics >= course.outline.length) {
        await BadgeService.checkAndAward(userId, "course_completed", {
          courseId,
        });
      }
    }
  }

  return progress;
};

const getProgress = async (userId: string, courseId: string) => {
  const progress = await ProgressModel.findOne({
    user: userId,
    course: courseId,
  });

  if (!progress) return null;

  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  const totalTopicsInCourse = course.outline.length;
  const completedCount = progress.completedTopics.length;

  const completionPercentage =
    totalTopicsInCourse > 0
      ? Math.round((completedCount / totalTopicsInCourse) * 100)
      : 0;

  return {
    ...progress.toObject(),
    completionPercentage,
  };
};

const awardStreakPoints = async (userId: string, streakDayCount: number) => {
  const points =
    config.baseStreakPoint + (streakDayCount - 1) * config.baseStreakPoint;
  await PointsService.addPoints(
    userId,
    points,
    "streak",
    `Daily login streak reward`
  );
  await BadgeService.checkAndAward(userId, "streak", {
    streakDays: streakDayCount,
  });
};

export const ProgressService = {
  updateProgress,
  getProgress,
  awardStreakPoints,
};
