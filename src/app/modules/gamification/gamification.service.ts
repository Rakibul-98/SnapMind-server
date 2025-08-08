// gamification.service

import { PointsModel } from "./gamification.model";

const addPoints = async (
  userId: string,
  points: number,
  type: "quiz" | "course" | "streak",
  description: string
) => {
  let record = await PointsModel.findOne({ user: userId });

  if (!record) {
    record = await PointsModel.create({
      user: userId,
      totalPoints: points,
      history: [
        {
          type,
          points,
          description,
          date: new Date(),
        },
      ],
    });
  } else {
    record.totalPoints += points;
    record.history.push({
      type,
      points,
      description,
      date: new Date(),
    });
    await record.save();
  }

  return record;
};

const getLeaderboard = async () => {
  return PointsModel.find()
    .sort({ totalPoints: -1 })
    .populate("user", "name email");
};

export const PointsService = {
  addPoints,
  getLeaderboard,
};
