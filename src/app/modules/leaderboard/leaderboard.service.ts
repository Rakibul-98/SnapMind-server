import { PointsModel } from "../gamification/gamification.model";
import { User } from "../user/user.model";

interface LeaderboardEntry {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  totalPoints: number;
}

const getLeaderboard = async (
  limit = 10,
  skip = 0
): Promise<LeaderboardEntry[]> => {
  const pointsEntries = await PointsModel.find()
    .sort({ totalPoints: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const userIds = pointsEntries.map((entry) => entry.user);

  const users = await User.find(
    { _id: { $in: userIds } },
    { name: 1, email: 1 }
  ).lean();

  const userMap = new Map(users.map((u) => [u._id.toString(), u]));

  const leaderboard: LeaderboardEntry[] = pointsEntries.map((entry) => {
    const user = userMap.get(entry.user.toString());
    return {
      user: {
        _id: user?._id.toString() || "",
        name: user?.name || "Unknown",
        email: user?.email || "",
      },
      totalPoints: entry.totalPoints,
    };
  });

  return leaderboard;
};

export const LeaderboardService = {
  getLeaderboard,
};
