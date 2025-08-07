import { ProgressModel } from "./progress.model";

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
  } else {
    // Only update if topic not completed yet
    const alreadyCompleted = progress.completedTopics.includes(topic);

    if (!alreadyCompleted) {
      progress.completedTopics.push(topic);
      progress.quizScores.push({ topic, score });
      progress.totalScore += score;
      progress.totalTopics += 1;
      await progress.save();
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

export const ProgressService = {
  updateProgress,
  getProgress,
};
