// progress.service

import { PointsService } from "../gamification/gamification.service";
import { ProgressModel } from "./progress.model";

const QUIZ_POINTS = 10;
const COURSE_POINTS = 50;
const STREAK_POINTS = 5;

const updateProgress = async (
  userId: string,
  courseId: string,
  topic: string,
  score: number
) => {
  let progress = await ProgressModel.findOne({
    user: userId,
    course: courseId,
  });

  if (!progress) {
    progress = await ProgressModel.create({
      user: userId,
      course: courseId,
      completedTopics: [topic],
      quizScores: [{ topic, score }],
      totalScore: score,
      totalTopics: 1,
    });
    await PointsService.addPoints(
      userId,
      QUIZ_POINTS,
      "quiz",
      `Completed quiz for topic "${topic}"`
    );
  } else {
    const alreadyCompleted = progress.completedTopics.includes(topic);

    if (!alreadyCompleted) {
      progress.completedTopics.push(topic);
      progress.quizScores.push({ topic, score });
      progress.totalScore += score;
      progress.totalTopics += 1;
      await progress.save();

      await PointsService.addPoints(
        userId,
        QUIZ_POINTS,
        "quiz",
        `Completed quiz for topic "${topic}"`
      );
      const COURSE_TOTAL_TOPICS = 5; // change based on actual course size
      if (progress.totalTopics >= COURSE_TOTAL_TOPICS) {
        await PointsService.addPoints(
          userId,
          COURSE_POINTS,
          "course",
          `Completed course "${courseId}"`
        );
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
  return progress;
};

const awardStreakPoints = async (userId: string) => {
  await PointsService.addPoints(
    userId,
    STREAK_POINTS,
    "streak",
    `Daily login streak reward`
  );
};

export const ProgressService = {
  updateProgress,
  getProgress,
  awardStreakPoints,
};
