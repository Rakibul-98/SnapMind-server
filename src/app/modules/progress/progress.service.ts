import { ProgressModel } from "./progress.model";

const markTopicComplete = async (
  user: string,
  course: string,
  topic: string
) => {
  const progress = await ProgressModel.findOneAndUpdate(
    { user, course },
    { $addToSet: { completedTopics: topic } },
    { upsert: true, new: true }
  );
  return progress;
};

const saveQuizScore = async (
  user: string,
  course: string,
  topic: string,
  score: number
) => {
  const progress = await ProgressModel.findOne({ user, course });

  if (!progress) {
    return await ProgressModel.create({
      user,
      course,
      completedTopics: [],
      quizScores: [{ topic, score }],
    });
  }

  const alreadyScored = progress.quizScores.find((q) => q.topic === topic);
  if (!alreadyScored) {
    progress.quizScores.push({ topic, score });
    await progress.save();
  }

  return progress;
};

const getProgress = async (user: string, course: string) => {
  const progress = await ProgressModel.findOne({ user, course });
  return progress;
};

export const ProgressService = {
  markTopicComplete,
  saveQuizScore,
  getProgress,
};
